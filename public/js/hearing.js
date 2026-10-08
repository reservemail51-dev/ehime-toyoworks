/* かんたん質問シート：入力チェック */
(function () {
  "use strict";
  var form = document.getElementById("hearing-form");
  if (!form) return;

  // 「雰囲気」は2つまで（3つ目を選ぶと、最初に選んだものを外す）
  var picked = [];
  form.querySelectorAll(".js-max2 input[type=checkbox]").forEach(function (box) {
    box.addEventListener("change", function () {
      if (box.checked) {
        picked.push(box);
        if (picked.length > 2) { picked.shift().checked = false; }
      } else {
        picked = picked.filter(function (b) { return b !== box; });
      }
    });
  });

  var err = document.getElementById("hearing-error");
  function showError(msg, el) {
    err.textContent = msg;
    err.hidden = false;
    if (el) el.focus();
  }

  form.addEventListener("submit", function (e) {
    err.hidden = true;
    var shop = form.querySelector("#h-shop");
    var name = form.querySelector("#h-name");
    var mail = form.querySelector("#h-mail");
    var line = form.querySelector("#h-line");
    var agree = form.querySelector("#h-agree");
    var trap = form.querySelector('input[name="_gotcha"]');

    if (trap && trap.value) { e.preventDefault(); return; }
    if (!shop.value.trim()) { e.preventDefault(); return showError("お店・会社の名前を入力してください。", shop); }
    if (!name.value.trim()) { e.preventDefault(); return showError("ご担当者のお名前を入力してください。", name); }
    if (!mail.value.trim() && !line.value.trim()) {
      e.preventDefault(); return showError("メールアドレスかLINEの表示名の、どちらかを入力してください。", mail);
    }
    if (mail.value.trim() && !mail.checkValidity()) {
      e.preventDefault(); return showError("メールアドレスの形をご確認ください。", mail);
    }
    if (!agree.checked) { e.preventDefault(); return showError("プライバシーポリシーへの同意にチェックをお願いします。", agree); }
    if (form.getAttribute("action").indexOf("【") !== -1) {
      e.preventDefault(); return showError("（準備中）送信先がまだ設定されていません。お手数ですがLINEかメールでご連絡ください。");
    }
  });
})();
