# このリポジトリのルール（Claude Code向け）

東予エリア向けホームページ制作サービスの自社サイト。詳しい方針は `docs/制作指示書.md` を正とする。

## 技術
- 静的な HTML / CSS / JavaScript のみ。ビルドツール・フレームワーク禁止。日本語サイト。
- 共通CSSは `public/css/style.css`、共通JSは `public/js/main.js`。色・フォントは `:root` のトークンを使う（直書きしない）。
- ヘッダー・フッターは各ページにコピーで持つ。変更するときは全ページを一括で直す。
- 公開は GitHub → Cloudflare（Workers の静的アセット。URL：https://ehime-toyoworks.hp-web.workers.dev/）。設定はリポジトリ直下の `wrangler.jsonc`（name は Cloudflare 上の Worker 名と同じ `ehime-toyoworks`）。旧メモの「Cloudflare Pages」は同じ意味で読み替える。**公開されるのは `public/` フォルダだけ**（ビルドコマンドなし、ビルド出力ディレクトリ `public`）。ページ・CSS・JS・画像・データはすべて `public/` の中に置く。`docs/`・`tools/`・説明書はリポジトリ直下に置き、公開しない。
- `public/_headers` でセキュリティ用ヘッダーとキャッシュを設定。サイト全体の検索よけ（noindex）は2026年10月8日に外した（検索に出る状態）。`hearing.html`・`thanks.html`・`hearing-thanks.html`・`404.html` は各ページの meta で noindex。
- スマホファースト。幅360pxで横スクロールが出ないこと。本文16px以上、ボタン高さ48px以上。
- 画像は WebP（実績のスクリーンショットは jpg でも可）、`width`/`height`・日本語 `alt`・`loading="lazy"`（ファーストビューを除く）。
- 未確定の情報は【仮】のまま残す。価格には `<!-- PRICE -->` コメントを付ける。

## デザインの禁止事項
紫〜青グラデーション／ガラス風／ネオン／光る球体、同じ形のアイコンカードの羅列、絵文字アイコン、全部中央揃え、強い影と角丸の多用、全要素フェードイン、英語の飾り見出し、実在しないお客様の声や数字。

## 実績の追加手順
1. 画像を `public/images/works/<id>/` に入れる（`thumb.webp` 800px幅、`pc.webp`・`sp.webp` 1600px幅程度）。
2. `public/data/works.js` の `window.WORKS` に1件追加する（書式はファイル先頭のコメント参照）。
3. `type` は受注＝`client`、架空の自主制作＝`sample`、デザイン案＝`design`。`sample` には自動で「架空のお店のサンプルです」が付く。
4. トップに出したいものは `pickup: true`（最大3件表示）。実績が0件のときは、トップの「制作実績」セクションは自動で非表示になる
5. `voice`（お客様の声）は実際にもらったものだけ。

## 補足
- `public/samples/<id>/` に架空店舗のサンプルサイト本体を置く（`samples/tomoshibi/` ＝ともしび珈琲、`samples/kohaku/` ＝洋食 こはく、`samples/hiuchi/` ＝酒と肴 ひうち、`samples/soyogi/` ＝hair room そよぎ、`samples/shizuku/` ＝しずく洋菓子店、`samples/mizunowa/` ＝みずのわベーカリー）。実績データの `url` から「サイトを見る」でリンクする。実在のお店と間違われないよう、各ページに noindex を入れ、`_headers` でも `/samples/*` を noindex にしている。画像は埋め込み（base64）にせず `img/` に分けて置く。シェア画像は各 `img/ogp.jpg`（1200×630）。`type: "sample"` の実績は、カードに「※実在しない架空の店舗です」、詳細ページの見出し下に架空である旨の囲みが自動で出る。`area` も「架空の店舗（〇〇市という設定）」と書く。
- `index.html` の head にある `google-site-verification` の meta は Google Search Console の所有確認用。消すと登録が外れるので残す。
- LINE公式アカウントの友だち追加URL：`https://lin.ee/RsPD66x`（全ページのLINEボタン・自動返信の文面に反映済み）。
- 制作の料金はプラン1つ（5,000円〜・税込）。ライト／スタンダード／しっかりの3プランは廃止した。実績データの `plan` は「1ページ」などの規模を書く。
- プライバシーポリシーのページは置かない方針（2026年10月に削除）。代わりに、お問い合わせフォームと質問シートの送信ボタンの上に「いただいた内容は、ご相談へのお返事とホームページづくりのためだけに使い…」という利用目的の一文を置いている。
- 自己紹介（about.html・トップの「つくっている人」）は、いったん掲載しない方針。ナビにも入れていない。
- 下層ページの画像ダミーは `images/works/<id>/` のフォルダ名を表示する。
- `tools/screenshot.mjs`：実績用スクリーンショット（jpg）と `images/ogp.png` の書き出し。`tools/ogp.html` がシェア画像のひな形（文言を変えたら再出力）。
- `hearing.html`（かんたん質問シート）と `hearing-thanks.html` は検索に出さない（noindex）。メニューには載せず、送信完了ページ・流れのページ・自動返信からリンクする。自動返信の文面は `docs/自動返信メッセージ.md`、LINE・メール用のテキスト版は `docs/質問シート_テキスト版.txt`。
- `404.html` だけは、どの階層でも表示できるよう `/` から始まるパスを使っている。

## 公開前にやること
- 【仮】を全部埋める（`grep -rn "【" public` で確認）。
- フォームは SSGform。送信先は `contact.html`＝`https://ssgform.com/s/UbwntFaPOD0A`、`hearing.html`＝`https://ssgform.com/s/BKMfJ7OaGpqR`（2026年10月に反映済み）。設定内容は `docs/SSGform設定シート.md`。公開後にテスト送信する。
