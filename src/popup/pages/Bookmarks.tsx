/// 検索フォームとブックマークの一覧を表示するコンポーネント

import { Box, Button, Group, List, Text, Title } from "@mantine/core";
import { BookmarkListForm } from "../components/BookmarkListForm";
import { BookmarkListItem } from "../components/BookmarkListItem";
import { useBookmarkData } from "../hooks/UseBookmarkData";
import { useKeywordData } from "../hooks/UseKeywordData";

type Props = {
  setInputRef: any;
  linkRefs: any;
}

export const Bookmarks: React.FC<Props> = ({ setInputRef, linkRefs }) => {
  
  const { keyword, handleChangeKeyword } = useKeywordData();
  const { bookmarks } = useBookmarkData(keyword);
    
  return (
    <>
      <BookmarkListForm 
        onChange={handleChangeKeyword} 
        bookmarkLength={bookmarks.length} 
        setInputRef={setInputRef}
      />
      {bookmarks.length > 0 && (
        <List type="ordered"  mt="md">
          {bookmarks.map((bookmark, index) => (
            <BookmarkListItem 
              key={bookmark.url} 
              bookmark={bookmark}
              index={index}
              linkRefs={linkRefs}
            />
          ))}
        </List>
      )}
    </>
    
  )
}