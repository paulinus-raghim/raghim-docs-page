(function () {
  var box = document.getElementById('doc-search');
  if (!box) return;
  var out = document.getElementById('doc-search-results'), index = null;
  function load() {
    if (index) return Promise.resolve(index);
    return fetch('/assets/search-index.json').then(function (r) { return r.json(); }).then(function (j) { return (index = j); });
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function run() {
    var q = box.value.toLowerCase().split(/\s+/).filter(Boolean);
    if (!q.length) { out.hidden = true; return; }
    load().then(function (idx) {
      var hits = [];
      idx.forEach(function (e) {
        var h = e.heading.toLowerCase(), p = e.page.toLowerCase(), t = e.text.toLowerCase(), s = 0;
        for (var i = 0; i < q.length; i++) {
          var w = q[i], sc = (h.indexOf(w) > -1 ? 5 : 0) + (p.indexOf(w) > -1 ? 2 : 0) + (t.indexOf(w) > -1 ? 1 : 0);
          if (!sc) return;
          s += sc;
        }
        hits.push([s, e]);
      });
      hits.sort(function (a, b) { return b[0] - a[0]; });
      out.innerHTML = hits.length ? hits.slice(0, 8).map(function (h) {
        var e = h[1];
        return '<a href="' + e.url + '"><strong>' + esc(e.heading) + '</strong><span>' + esc(e.section ? e.section + ' / ' + e.page : e.page) + '</span></a>';
      }).join('') : '<p>No results</p>';
      out.hidden = false;
    });
  }
  box.addEventListener('input', run);
  box.addEventListener('focus', run);
  box.addEventListener('keydown', function (e) { if (e.key === 'Escape') { out.hidden = true; box.blur(); } });
  document.addEventListener('click', function (e) { if (!e.target.closest('.doc-search')) out.hidden = true; });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); box.focus(); }
  });
})();
