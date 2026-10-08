/* =========================================================
   制作実績データ
   ここに1件書き足すだけで、トップのピックアップ・実績一覧・詳細ページに反映されます。

   type:
     "client" … 受注した実績
     "sample" … 自主制作（架空のお店）※「架空のお店のサンプルです」と自動表示
     "design" … デザイン案・バナーなど
   画像は images/works/<id>/ に置き、thumb / images にパスを書く。
   画像がまだ無いときは thumb を "" にしておけばダミー枠が出ます。
   voice（お客様の声）は、実際にいただいたものだけ書く。無ければ書かない。
   ========================================================= */
/* 書き方の例（このままでは表示されません。コピーして下の [ ] の中に貼り、書きかえて使います）
  {
    id: "shop-id",              // 英数字。画像フォルダ名・URLに使う
    title: "お店の名前",
    type: "client",             // client / sample / design
    industry: "業種",
    area: "新居浜市",
    plan: "1ページ",
    year: 2026,
    pickup: true,               // トップに出すなら true
    thumb: "images/works/shop-id/thumb.webp",
    images: ["images/works/shop-id/pc.webp", "images/works/shop-id/sp.webp"],
    url: "https://〇〇",          // 公開中のURL（なければ ""）
    summary: "ひとことの説明。",
    points: ["工夫したところ1", "工夫したところ2"]
    // voice: "お客様の声（実際にいただいたものだけ）"
  },
*/
window.WORKS = [
  {
    id: "tomoshibi",
    title: "ともしび珈琲",
    type: "sample",
    industry: "喫茶店",
    area: "架空の店舗（西条市という設定）",
    plan: "1ページ",
    year: 2026,
    pickup: true,
    thumb: "images/works/tomoshibi/thumb.webp",
    images: ["images/works/tomoshibi/pc.webp", "images/works/tomoshibi/sp.webp"],
    url: "samples/tomoshibi/",
    summary: "【架空の店舗】西条市の自家焙煎の喫茶店、という設定でつくった1ページのサンプルサイト。",
    points: [
      "営業時間と定休日を、開いてすぐ目に入る位置に",
      "モーニング・ランチ・ドリンク・スイーツを切りかえて見られるメニュー",
      "定休日と臨時休業がひと目でわかる営業カレンダー",
      "お子さま連れの方向けの案内（座敷・ベビーカー・おむつ替え台）",
      "LINE・電話・フォームの3つから問い合わせできる形に"
    ]
  },
  {
    id: "kohaku",
    title: "洋食 こはく",
    type: "sample",
    industry: "洋食店",
    area: "架空の店舗（新居浜市という設定）",
    plan: "1ページ",
    year: 2026,
    pickup: true,
    thumb: "images/works/kohaku/thumb.webp",
    images: ["images/works/kohaku/pc.webp", "images/works/kohaku/sp.webp"],
    url: "samples/kohaku/",
    summary: "【架空の店舗】新居浜で40年続く町の洋食屋、という設定でつくった1ページのサンプルサイト。",
    points: [
      "ランチ・ディナー・テイクアウトを切りかえて見られる、メニューブック風の価格表",
      "スマホでは画面の下に「電話する」「予約・問い合わせ」ボタンを固定",
      "お弁当の予約と配達の流れを、3つの手順でわかりやすく",
      "ご家族連れ向けの案内（お子様ランチ・キッズチェア・座敷）",
      "イラスト地図とよくある質問で、はじめての方も迷わないように"
    ]
  },
  {
    id: "hiuchi",
    title: "酒と肴 ひうち",
    type: "sample",
    industry: "居酒屋",
    area: "架空の店舗（新居浜市という設定）",
    plan: "1ページ",
    year: 2026,
    pickup: true,
    thumb: "images/works/hiuchi/thumb.webp",
    images: ["images/works/hiuchi/pc.webp", "images/works/hiuchi/sp.webp"],
    url: "samples/hiuchi/",
    summary: "【架空の店舗】燧灘の地魚と東予の地酒を出す新居浜の居酒屋、という設定でつくった1ページのサンプルサイト。",
    points: [
      "黒板風の「本日のおすすめ」で、日替わりの仕入れを伝える",
      "お造り・焼き物・季節の一品・〆・お飲み物を切りかえて見られるお品書き",
      "コースと飲み放題、宴会の人数をひと目でわかるように",
      "スマホでは画面の下に「電話する」「予約する」ボタンを固定",
      "日時・人数・席の希望まで入れられる予約フォーム"
    ]
  }
];
