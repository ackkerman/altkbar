import React, { useEffect, useRef } from 'react';
import { Modal, List } from '@mantine/core';
import { BookmarkListForm } from './BookmarkListForm';
import { BookmarkListItem } from './BookmarkListItem';
import { useBookmarkData } from '../hooks/UseBookmarkData';
import { useKeywordData } from '../hooks/UseKeywordData';

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const CommandPalette: React.FC<Props> = ({ opened, onClose }) => {
  const { keyword, handleChangeKeyword } = useKeywordData();
  const { bookmarks } = useBookmarkData(keyword);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const linkRefs: any = useRef([]);

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [opened]);

  return (
    <Modal opened={opened} onClose={onClose} centered overlayBlur={3} withinPortal={false}>
      <BookmarkListForm
        onChange={handleChangeKeyword}
        bookmarkLength={bookmarks.length}
        setInputRef={(ref) => (inputRef.current = ref)}
      />
      {bookmarks.length > 0 && (
        <List type="ordered" mt="md">
          {bookmarks.map((bookmark, index) => (
            <BookmarkListItem key={bookmark.url} bookmark={bookmark} index={index} linkRefs={linkRefs} />
          ))}
        </List>
      )}
    </Modal>
  );
};
