(function () {
  'use strict';

  var TARGET_URL = 'https://www.youtube.com/tv';

  // webOS LG remote: Back key = 461. ESC = simulator/desktop.
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 461 || e.keyCode === 27) {
      e.preventDefault();
      closeApp();
    }
  });

  function closeApp() {
    if (window.webOS && typeof window.webOS.platformBack === 'function') {
      window.webOS.platformBack();
      return;
    }
    if (window.PalmSystem && typeof window.PalmSystem.platformBack === 'function') {
      window.PalmSystem.platformBack();
      return;
    }
    window.close();
  }

  // Brief splash, then navigate. Full-page navigation is required because
  // youtube.com sends X-Frame-Options: SAMEORIGIN and cannot be iframed.
  setTimeout(function () {
    window.location.replace(TARGET_URL);
  }, 600);
})();
