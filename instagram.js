/* Blesscon Candy - Instagram feed without the Meta API
   1) WIDGET EMBED - if you pasted a Behold/SnapWidget/LightWidget embed inside
      <div id="ig-feed"> in index.html, that widget renders itself and this
      script leaves it alone.
   2) instagram.json - {"posts":[{"image":"https://...jpg","url":"https://www.instagram.com/p/...","caption":"..."}]}
   3) FALLBACK - branded grid linking to your profile.
   Recommended zero-approval setup: Behold (behold.so) free plan - connect
   @blessconcandy by simply logging in with Instagram, paste the embed code
   into the #ig-feed div. Posts appear within ~15 minutes. */
(function () {
  "use strict";
  var root = document.getElementById("ig-feed");
  if (!root) return;
  var PROFILE = "https://www.instagram.com/blessconcandy/";
  var LIMIT = 8;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function renderGrid(posts) {
    root.innerHTML = posts.slice(0, LIMIT).map(function (p) {
      var url = p.url || PROFILE;
      var cap = (p.caption || "@blessconcandy").replace(/\s+/g, " ");
      return '<a class="ig-item" href="' + esc(url) + '" target="_blank" rel="noopener">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(cap.slice(0, 120)) + ' - Blesscon Candy on Instagram" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.style.display=\'none\'">' +
        '<span class="ig-cap">' + esc(cap.slice(0, 90)) + "</span></a>";
    }).join("");
  }
  function fallback() {
    var imgs = [
      ["hero-banner.webp", "RANI Fruit Candy range by Blesscon Candy, Karachi"],
      ["rani-gift-pack.webp", "RANI candy gift packs for weddings and events"],
      ["custom-dholki-cone.webp", "Custom dholki candy favour cones"],
      ["zoombie-mango.webp", "Zoombie sour chew candy bars"]
    ];
    root.innerHTML = imgs.map(function (it) {
      return '<a class="ig-item" href="' + PROFILE + '" target="_blank" rel="noopener me">' +
        '<img src="assets/' + it[0] + '" alt="' + esc(it[1]) + ' - see daily candy photos on Instagram @blessconcandy" loading="lazy">' +
        '<span class="ig-cap">@blessconcandy &middot; Follow us on Instagram</span></a>';
    }).join("");
  }
  setTimeout(function () {
    if (root.children.length) return;
    fetch("instagram.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("no json")); })
      .then(function (d) {
        var posts = (d && d.posts) || [];
        if (root.children.length) return;
        if (posts.length) renderGrid(posts); else fallback();
      })
      .catch(function () { if (!root.children.length) fallback(); });
  }, 1500);
})();
