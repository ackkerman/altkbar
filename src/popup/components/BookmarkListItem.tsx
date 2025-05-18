import { useEffect, useRef } from 'react';
import { Anchor, Badge, Group, List, Text, Title } from "@mantine/core";
import { BookmarkItem } from "../types/BookmarkData";

type Props = {
  bookmark: BookmarkItem;
  index: number;
  linkRefs: any;
};


export const BookmarkListItem: React.FC<Props> = ({ bookmark, index, linkRefs }) => {
  const linkRef = useRef(null);

  // refオブジェクトの追加
  useEffect(() => {
    if (!linkRefs.current[index]) {
      linkRefs.current[index] = linkRef.current;
    }
  }, [linkRef]);

  return (
    <List.Item>
      <Group>
        <Title order={4}>
          <Anchor href={bookmark.url} target="_blank" ref={linkRef} rel="noopener noreferrer">
            {bookmark.title}
          </Anchor>
        </Title>
        {index === 0 && (
        <Badge fz="sm" color='orange.5'>Alt + j</Badge>
        )}
        {index < 9 && (
        <Badge fz="sm" color='orange.5'>Alt + {index + 1}</Badge> // ショートカットキーの表示
        )}
      </Group>
      <Group>
        {bookmark.category?.map((category) => (
        <Badge fz="sm" color='blue.5'>{category}</Badge> // ブックマークの親フォルダ名の表示
        ))}
      </Group>
    </List.Item>
  );
};
