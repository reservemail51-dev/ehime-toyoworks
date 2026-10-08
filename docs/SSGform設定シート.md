# SSGform 設定シート（コピーして貼り付ける用）

SSGform（https://ssgform.com）で、下の2つのフォームを作ります。
登録メールアドレス：ehime.toyoworks@gmail.com

---

## ① お問い合わせ用（フォームURL：https://ssgform.com/s/UbwntFaPOD0A）

フォーム名
```
お問い合わせ
```

通知先メールアドレス
```
ehime.toyoworks@gmail.com
```

送信後転送先URL
```
https://ehime-toyoworks.reservemail51.workers.dev/thanks.html
```

許可ホスト（https:// は付けない）
```
ehime-toyoworks.reservemail51.workers.dev
```

自動返信メール：**オン**

返信先（Reply-to）がある場合
```
ehime.toyoworks@gmail.com
```

自動返信の件名
```
【愛媛東予Works】お問い合わせありがとうございます
```

自動返信の本文
```
この度はお問い合わせいただき、ありがとうございます。
愛媛東予Worksです。

ご相談の内容を受け取りました。
返信は原則24時間以内にさせて頂きます。
（返信時間帯：基本7時頃〜20時頃／平日・土日問わず）

お時間があれば、下の「かんたん質問シート」にもお答えください。
選ぶだけの質問がほとんどで、5分ほどで終わります。
先に答えていただくと、無料デモのご用意が早くなります。

▼かんたん質問シート
https://ehime-toyoworks.reservemail51.workers.dev/hearing.html

※このメールは自動で送信しています。
※お心当たりのない場合は、お手数ですがこのメールを削除してください。

愛媛東予Works
メール：ehime.toyoworks@gmail.com
LINE：https://lin.ee/RsPD66x
```

---

## ② 質問シート用（フォームURL：https://ssgform.com/s/BKMfJ7OaGpqR）

フォーム名
```
質問シート
```

通知先メールアドレス
```
ehime.toyoworks@gmail.com
```

送信後転送先URL
```
https://ehime-toyoworks.reservemail51.workers.dev/hearing-thanks.html
```

許可ホスト（https:// は付けない）
```
ehime-toyoworks.reservemail51.workers.dev
```

自動返信メール：なし（オフのままでOK）

---

## 作ったあと

それぞれのフォームを保存すると、
`https://ssgform.com/s/〇〇〇〇` のような「フォームURL」が表示されます。
**2つのURL（お問い合わせ用・質問シート用）を Claude に送ってください。**
サイトのフォームの送信先を差し替えて、上げ直す用のファイルを作ります。

## テスト（サイトに反映されたあと）

- [ ] お問い合わせを1回送る → Gmail に通知が届く
- [ ] 自動返信メールが届く（迷惑メールフォルダも確認）
- [ ] 送信後に「送信ありがとうございました」のページが出る
- [ ] 質問シートを1回送る → 通知が届き、「質問シートを受け取りました」のページが出る

送信でエラー（403 など）になるときは、許可ホストの打ち間違いを確認してください。
