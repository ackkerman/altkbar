/// 
export interface BookmarkTreeNode {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
  title: string;
  dateAdded?: number;
  dateGroupModified?: number;
  unmodifiable?: string;
  children?: BookmarkTreeNode[];
}

export type BookmarkItem = {
  title: string;
  url: string;
  category: string[];
}