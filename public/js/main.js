/* 共通スクリプト（ビルド不要・素のJavaScript） */
(function () {
  "use strict";

  /* ---------- 別ページに移ったときは、いちばん上から表示する ---------- */
  // （ブラウザやプレビュー画面が前のスクロール位置を引き継いでしまうのを防ぐ。
  //   「戻る」ボタンや再読み込みのときは、元の位置のままにする）
  (function () {
    var nav = window.performance && performance.getEntriesByType ? performance.getEntriesByType("navigation")[0] : null;
    var isNewPage = !nav || nav.type === "navigate";
    var hashTarget = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!isNewPage || hashTarget) return;
    try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}
    var userMoved = false;
    ["wheel", "touchstart", "keydown", "mousedown", "hashchange"].forEach(function (ev) {
      window.addEventListener(ev, function () { userMoved = true; }, { passive: true, once: true });
    });
    function toTop() { if (!userMoved) window.scrollTo(0, 0); }
    toTop();
    window.addEventListener("load", function () { toTop(); setTimeout(toTop, 80); setTimeout(toTop, 300); });
  })();

  /* ---------- スマホメニュー ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });
    document.querySelectorAll(".gnav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- ヘッダーの下線・LINE固定ボタンの出し入れ ---------- */
  var header = document.querySelector(".site-header");
  var fixedLine = document.querySelector(".fixed-line");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (fixedLine) {
      // ファーストビューのボタンが見えている間と、ページ最下部では隠す
      var nearBottom = window.innerHeight + y > document.body.scrollHeight - 260;
      fixedLine.classList.toggle("is-hidden", y < 420 || nearBottom);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- ふわっと表示（.reveal を付けた要素だけ） ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 制作実績 ---------- */
  var TYPE_LABEL = { client: "制作実績", sample: "架空のお店のサンプルです", design: "デザイン" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function workCard(w) {
    var photo = w.thumb
      ? '<img src="' + esc(w.thumb) + '" alt="' + esc(w.title) + 'のサイトの画面" width="800" height="600" loading="lazy">'
      : '<div class="dummy">画像準備中<br>images/works/' + esc(w.id) + '/</div>';
    return (
      '<a class="work-card" href="work.html?id=' + encodeURIComponent(w.id) + '">' +
        '<div class="work-card__photo">' + photo + "</div>" +
        '<div class="work-card__meta">' +
          '<span class="badge badge--' + esc(w.type) + '">' + esc(TYPE_LABEL[w.type] || "") + "</span>" +
          "<span>" + esc(w.industry) + (w.area && w.area !== "架空" ? "・" + esc(w.area) : "") + "</span>" +
        "</div>" +
        "<h3>" + esc(w.title) + "</h3>" +
        (w.type === "sample" ? '<p class="work-card__fict">※実在しない架空の店舗です</p>' : "") +
        "<p>" + esc(w.summary) + "</p>" +
      "</a>"
    );
  }

  // トップのピックアップ（最大3件）
  var pickup = document.getElementById("pickup-works");
  if (pickup) {
    var list = (window.WORKS || []).filter(function (w) { return w.pickup; }).slice(0, 3);
    pickup.innerHTML = list.length
      ? list.map(workCard).join("")
      : '<p class="works-empty">ただいま準備中です。少しずつ増やしていきます。</p>';
    // 実績が1件もないときは、トップの「制作実績」のまとまりごと隠す（追加すれば自動で出る）
    if (!(window.WORKS || []).length) {
      var worksSec = pickup.closest("section");
      if (worksSec) worksSec.hidden = true;
    }
  }

  // 実績一覧ページ（works.html）で使う関数を公開
  window.renderWorkCard = workCard;
  window.WORK_TYPE_LABEL = TYPE_LABEL;
})();
