// Loads the help desk avatar early enough for Nelson to stand on the
// sidewalk during the storefront loading screen (and fly to his corner
// when the hero appears). It waits for React to finish hydrating
// (<html class="js"> is added by the page after hydration) so the avatar
// never interferes with it.
(function () {
  var src = new URL('helpdesk-v12.js', (document.currentScript && document.currentScript.src) || location.href).href;
  var started = false;
  function load() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.type = 'module';
    s.src = src;
    document.body.appendChild(s);
  }
  var t0 = Date.now();
  function check() {
    if (document.documentElement.classList.contains('js')) return setTimeout(load, 350);
    if (Date.now() - t0 > 3000) return load();   // hydration signal never came: go anyway
    setTimeout(check, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', check);
  else check();
  setTimeout(load, 12000); // safety net
})();
