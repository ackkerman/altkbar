/// グローバル定数
export const commonValue = {
  /// アプリ名
  appName: "Moskeyto",

  /// アプリの説明
  appDescription: "A simple bookmark manager extention",

  /// アプリのGithubリポジトリ
  appGithubUrl: "https://github.com/moxak/moskeyto",

  /// ドキュメントが読み込まれるまでの待機時間（ミリ秒）
  loadDelay: 100,
} as const satisfies { [key: string]: unknown };

/// 監視対象のURL
export const targetUrls = {

} as const satisfies { [key: string]: string };

/// メッセージングによる操作の種類
export const messageActions = {
  /// ブラウザからブックマークデータを取得する
  getBookmarks: "getBookmarks",
} as const satisfies { [key: string]: string };
