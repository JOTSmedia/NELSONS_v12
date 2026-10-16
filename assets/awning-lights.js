// Awning string lights. A row of bulbs hangs from the scalloped hem of the
// green awning. During the storefront loading screen they switch on one by
// one, left to right, in step with the progress meter; once the shop is
// built they twinkle in alternating pairs. Added after React has hydrated
// so it never interferes with the page's own markup.
(function () {
  var XS = [16.8, 20.8, 24.8, 28.8, 32.4, 36.4, 40.3, 44.4, 48.3, 52.3, 56.4, 60.5, 64.5, 68.6, 72.5, 76.5, 80.5, 84.4];
  var Y = 50.2;                       // % down the storefront image (just under the hem)
  var wrap = null, bulbs = [], lit = 0, t0 = Date.now();

  function ready() {
    return document.documentElement.classList.contains('js') || Date.now() - t0 > 3000;
  }
  function ensure() {
    var st = document.querySelector('.hero-stage-inner');
    if (!st) return false;
    if (wrap && wrap.parentNode === st) return true;
    wrap = document.createElement('div');
    wrap.className = 'awn-lights';
    wrap.setAttribute('aria-hidden', 'true');
    bulbs = XS.map(function (x, i) {
      var b = document.createElement('i');
      b.style.left = x + '%';
      b.style.top = Y + '%';
      wrap.appendChild(b);
      return b;
    });
    st.appendChild(wrap);
    lit = 0;
    return true;
  }
  function progress() {
    var m = document.querySelector('.sidewalk-meter');
    return m ? (+m.getAttribute('aria-valuenow') || 0) : 100;   // meter gone = loading finished
  }
  function update() {
    if (!ready() || !ensure()) return;
    var p = progress();
    var want = Math.min(XS.length, Math.ceil((p / 100) * XS.length - 0.001));
    if (p >= 100) want = XS.length;
    while (lit < want) {
      bulbs[lit].classList.add('on');
      lit++;
    }
    wrap.classList.toggle('all', lit >= XS.length && p >= 100);
  }
  setInterval(update, 90);
})();
