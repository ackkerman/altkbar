import { Button, Group, TextInput, Text } from "@mantine/core";
import { IconExternalLink } from '@tabler/icons-react';
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { commonValue } from "../../CommonValue";

type Props = {
  onChange: (value: string) => void;
  bookmarkLength: number;
  setInputRef: any;
};

export const BookmarkListForm = React.memo<Props>(({ onChange, bookmarkLength, setInputRef }) => {
  const [keyword, setKeyword] = useState("");
  const [debounced] = useDebouncedValue(keyword, commonValue.loadDelay);

  // キーワードの入力が一定時間なかった時に呼び出される
  useEffect(() => {
    onChange(debounced);
  }, [debounced]);

  // クリアボタンを押下した時のイベント
  const handleClear = () => {
    setKeyword("");
  };

  return (
    <Group mt="md">
      <TextInput
        value={keyword}
        onChange={(e) => setKeyword(e.currentTarget.value)}
        autoFocus={true}
        autoComplete="off"
        placeholder="キーワード(Alt + l)"
        ref={(ref) => setInputRef(ref)}
      />
      <Button color="gray" onClick={handleClear} disabled={keyword.length < 1}>
        クリア
      </Button>
      <Text fz="lg">{bookmarkLength}件</Text>
    </Group>
  );
});
