import { useCallback, useState } from "react";

/// 検索キーワードのstateを管理するカスタムフック
export const useKeywordData = () => {
  const [keyword, setKeyword] = useState("");

  // キーワードが変更された時のイベント
  const handleChangeKeyword = useCallback((value: string) => {
    // 空白の除去
    setKeyword(value.replace(/\s+/g, ''));
  }, []);

  return { keyword, handleChangeKeyword };
};
