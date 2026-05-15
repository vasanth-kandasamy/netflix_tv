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

  // Full-page navigation (youtube.com blocks iframing via X-Frame-Options).
  // Use a longer delay so the webOS simulator finishes wiring its BrowserView
  // before we navigate away (otherwise it throws "Render frame was disposed
  // before WebFrameMain could be accessed"). On a real TV this is fine.
  setTimeout(function () {
    window.location.href = TARGET_URL;
  }, 2500);
})();
