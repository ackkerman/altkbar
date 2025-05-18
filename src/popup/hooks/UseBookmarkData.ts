import { useEffect, useState } from 'react';
import { BookmarkItem, BookmarkTreeNode } from '../types/BookmarkData';

export const useBookmarkData = (keyword:string) => {
  
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  const fetchBookmarks = async (): Promise<BookmarkTreeNode[]> => {
    return new Promise((resolve) => {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        resolve(bookmarkTreeNodes);
      });
    });
  };
  
  const flattenBookmarks = (
    bookmarkTreeNodes: BookmarkTreeNode[], 
    parentNodeTitles: string[]) => {
    
    parentNodeTitles = parentNodeTitles.filter((title) => {
      return title !== "Bookmarks bar" && 
            //  title !== "Other bookmarks" &&
             title !== "";
    });

    // Flatten the bookmark tree nodes
    const items: BookmarkItem[] = [];
    for (let node of bookmarkTreeNodes) {
      if (node.url) {
        items.push({
          title: node.title,
          url: node.url,
          category: parentNodeTitles,
        });
      }
      
      let newParentNodeTitles = parentNodeTitles.concat(node.title);

      if (node.children) {
        items.push(...flattenBookmarks(node.children, newParentNodeTitles));
      }
      
    }
    return items;
  }

  useEffect(() => {
    const fetchAndSetBookmarks = async () => {
      const bookmarkTreeNodes: BookmarkTreeNode[] = await fetchBookmarks();
      const items = flattenBookmarks(bookmarkTreeNodes, []).filter((i) =>
        // カテゴリー(ブックマークフォルダ名)を検索対象に含める
        (i.category.join('') + i.title).toLowerCase().includes(keyword.toLowerCase()),
      );
      setBookmarks(items);
    };
    fetchAndSetBookmarks();
  }, [keyword]);

  return { bookmarks};
  
}