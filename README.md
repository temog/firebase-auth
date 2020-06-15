# firebase-auth

Firebase で認証まとめ

## 初期設定

### Firebase で Project 作成

1. [Firebase console へログイン](https://console.firebase.google.com/?hl=ja)
2. プロジェクトを追加
   - 適当に名前つける。続行
   - アナリティクス有効にするか。続行
3. Authentication > Sign-in method
4. 使いたい認証を開いて有効にする (具体的な設定方法は 「認証プロバイダ毎の設定」を参照)
5. プロジェクトの概要に戻って「ウェブ </>」を開く
   - アプリのニックネーム入れて「アプリを登録」
   - Firebase SDK の追加に表示される `firebaseConfig` の中身をメモ

### nuxt 色々

1. nuxt project を作る `npx create-nuxt-app firebase-auth`
   - 以下デフォのままじゃないとこだけ書く。書いてないとこはデフォでいい
   - Choose Nuxt.js module : Axios, DotEnv にチェック
   - Choose linting tools : ESLint にチェック
   - Choose rendering mode : Single Page App
2. cd firebase-auth
3. .env に以下追記 (メモった firebaseConfig の中身を入れる)

```
API_KEY=
AUTH_DOMAIN=
DATABASE_URL=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
```

## 認証プロバイダ毎の設定

### Google

最低限「プロジェクトのサポートメール」だけ選べば使える

### Twitter

[公式](https://firebase.google.com/docs/auth/web/twitter-login?hl=ja)

色々めんどくさすぎるので対応しなくていいんじゃないかな。。

### Facebook

1. [開く](https://developers.facebook.com/apps/)
2. 新しいアプリを追加
   - 表示名を入れる
   - アプリ ID を作成してください、をポチる
   - Captcha を通る
3. アプリのトップに飛ぶ
   - 設定 からアプリ ID、シークレットをメモっておく
   - 製品を追加 > Facebook ログイン
   - 有効な OAuth リダイレクト URI に Firebase 設定で表示されてた URL を入れる
   - 変更を保存

### GitHub

1. [開く](https://github.com/settings/applications/new)
   - Application name : なにか入れる
   - Homepage URL : なにか入れる
   - Authorization callback URL : Firebase 設定のやつを入れる
   - Register application
   - Client ID と Client Secret を Firebase 設定に入れる

### メール

`メールリンク (パスワードレス)` の方法です

1. 2 つとも有効にするに変える
2. Templates からテンプレート言語を Japanese に変えるとまぁまぁ見れるメールになる

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
