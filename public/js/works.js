/* 制作実績の一覧（works.html）と詳細（work.html）を data/works.js から表示する */
(function () {
  "use strict";
  var WORKS = window.WORKS || [];
  var LABEL = window.WORK_TYPE_LABEL || {};
  var card = window.renderWorkCard;
  var FILTER_NAME = { client: "制作実績", sample: "自主制作サンプル", design: "デザイン" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- 一覧 ---------- */
  var grid = document.getElementById("works-list");
  var filter = document.getElementById("works-filter");
  if (grid && card) {
    // 新しい順
    var list = WORKS.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

    function render(type) {
      var items = type === "all" ? list : list.filter(function (w) { return w.type === type; });
      grid.innerHTML = items.length
        ? items.map(card).join("")
        : '<p class="works-empty">ただいま準備中です。少しずつ増やしていきます。</p>';
    }

    if (filter) {
      // 0件のカテゴリはボタンを出さない
      var types = ["client", "sample", "design"].filter(function (t) {
        return list.some(function (w) { return w.type === t; });
      });
      if (types.length > 1) {
        var html = '<button type="button" data-type="all" aria-pressed="true">すべて<span>' + list.length + "</span></button>";
        types.forEach(function (t) {
          var n = list.filter(function (w) { return w.type === t; }).length;
          html += '<button type="button" data-type="' + t + '" aria-pressed="false">' + FILTER_NAME[t] + "<span>" + n + "</span></button>";
        });
        filter.innerHTML = html;
        filter.addEventListener("click", function (e) {
          var btn = e.target.closest("button");
          if (!btn) return;
          filter.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
          render(btn.getAttribute("data-type"));
        });
      } else {
        filter.hidden = true;
      }
    }
    render("all");
  }

  /* ---------- 詳細 ---------- */
  var detail = document.getElementById("work-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id") || decodeURIComponent(location.hash.slice(1));
    var w = WORKS.filter(function (x) { return x.id === id; })[0];
    if (!w) {
      detail.innerHTML =
        '<h1 style="font-size:1.6rem">お探しの実績が見つかりませんでした</h1>' +
        '<p style="margin-top:1em">URLが変わったか、掲載を終了した可能性があります。</p>' +
        '<p><a class="more-link" href="works.html">制作実績の一覧へ</a></p>';
      return;
    }
    document.title = w.title + "｜制作実績｜愛媛東予Works";
    var crumb = document.getElementById("crumb-title");
    if (crumb) crumb.textContent = w.title;

    var imgs = (w.images || []);
    var shot = function (src, i, dummyLabel) {
      return src
        ? '<figure><img src="' + esc(src) + '" alt="' + esc(w.title) + "の画面（" + (i === 0 ? "パソコン" : "スマホ") + '）" loading="lazy"></figure>'
        : '<figure><div class="dummy">画像準備中<br>images/works/' + esc(w.id) + "/（" + dummyLabel + "）</div></figure>";
    };

    var html = "";
    html += '<div class="work-detail__head"><span class="badge badge--' + esc(w.type) + '">' + esc(LABEL[w.type] || "") + "</span>" +
            '<span class="note">' + esc(w.industry) + (w.area && w.area !== "架空" ? "・" + esc(w.area) : "") + "</span></div>";
    html += '<h1 style="font-size:clamp(1.6rem,1.2rem + 1.8vw,2.4rem)">' + esc(w.title) + "</h1>";
    html += '<p style="margin-top:.8em">' + esc(w.summary) + "</p>";
    html += '<div class="work-detail__shots">' + shot(imgs[0], 0, "パソコン") + shot(imgs[1], 1, "スマホ") + "</div>";

    html += '<div class="work-detail__body"><div>';
    if (w.points && w.points.length) {
      html += "<h2>こだわったところ</h2><ul class=\"check-list\">" + w.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>";
    }
    if (w.voice) {
      html += '<div class="voice"><p style="margin:0">' + esc(w.voice) + "</p></div>";
    }
    html += "</div><div>";
    html += '<table class="spec-table"><tbody>' +
      "<tr><th>業種</th><td>" + esc(w.industry) + "</td></tr>" +
      "<tr><th>地域</th><td>" + esc(w.area) + "</td></tr>" +
      "<tr><th>規模</th><td>" + esc(w.plan) + "</td></tr>" +
      "<tr><th>制作年</th><td>" + esc(w.year) + "年</td></tr>" +
      "</tbody></table>";
    if (w.url) {
      html += '<p style="margin-top:1.2em"><a class="more-link" href="' + esc(w.url) + '" target="_blank" rel="noopener">サイトを見る</a></p>';
    }
    if (w.type === "sample") {
      html += '<p class="sample-note">これは架空のお店を想定してつくったサンプルです。実在のお店とは関係ありません。</p>';
    }
    html += "</div></div>";
    html += '<p style="margin-top:48px"><a class="more-link" href="works.html">制作実績の一覧へ</a></p>';
    detail.innerHTML = html;
  }
})();
