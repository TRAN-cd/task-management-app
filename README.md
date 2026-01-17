# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# 業務タスク管理アプリ（React）

小規模チーム（2〜6人）向けの、  
Web制作案件におけるプロジェクトと業務タスクの進捗を管理するアプリです。

各プロジェクト内のタスク状態を一覧で可視化することで、  
作業の抜け漏れや担当者間の認識のずれを防ぐことを目的としています。

---

## アプリ概要

Web制作会社などの小規模チームを想定し、  
複数案件・複数タスクを扱う際の進捗管理をシンプルに行うためのアプリです。

---

## 作った背景・目的

Web制作の案件では、1つのプロジェクトに対して複数のタスクが発生します。  
しかし実務では、

- どのプロジェクトが進行中なのか
- 各タスクがどこまで完了しているのか

が担当者間で十分に共有されておらず、  
進捗状況を毎回口頭で説明する場面が多くありました。

また、プロジェクト自体が  
「受注済み」「進行中」「失注」  
といったどの状態にあるのかが把握しづらく、  
確認コストや認識のずれが発生していました。

そこで、**プロジェクトの状態と、その中のタスク進捗を一目で把握できるアプリ**があれば便利だと考え、本アプリを開発しました。

---

## 主な機能（MVP定義）

### MVPでできること
- プロジェクト（案件）の作成
- 各プロジェクトに作業タスクを登録
- タスクが持つ情報
  - タスク名
  - 担当者
  - ステータス（未着手 / 進行中 / 完了）
- プロジェクト単位で、  
  「どのタスクが・誰によって・どの状態か」を一覧で確認

### MVPでやらないこと（今後の改善フェーズで追加予定）
- ユーザー認証・権限管理
- 期限管理・リマインド機能
- コメント・ファイル添付
- ガントチャートなどの高度な分析機能
- 大規模チーム（10人以上）への対応

---

## 画面構成
- プロジェクト一覧画面
- プロジェクト詳細（タスク一覧）画面
- プロジェクト作成画面（簡易）

---

## 技術スタック
- React / TypeScript
- Vite
- React Router
- React Hooks（useState, useReducer）
- CSS / CSS Modules
- localStorage

### state設計について
本アプリでは、プロジェクト一覧をアプリ全体の state として管理し、  
各プロジェクトに紐づくタスクをネストした構造で保持しています。

タスクの追加やステータス変更は上位コンポーネントで状態を更新し、  
各画面には必要なデータのみを props として渡す構成としています。

---

## 工夫した点・学び（開発後に追記）
- stateの持ち方で悩んだ点
- コンポーネント分割の判断
- CSSアニメーションをどこに効かせたか

---

## 今後の改善予定（開発後に追記）
- 担当者を選択式にする
- プロジェクト自体のステータス管理
- データ永続化をAPIに変更
