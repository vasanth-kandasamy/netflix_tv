(function () {
  'use strict';

  var frame = document.getElementById('frame');
  var splash = document.getElementById('splash');

  // Hide splash once the iframe finishes its initial load.
  frame.addEventListener('load', function () {
    splash.classList.add('hidden');
    setTimeout(function () {
      splash.style.display = 'none';
    }, 500);
    // Make sure the iframe owns focus so the remote talks to YouTube.
    try { frame.contentWindow.focus(); } catch (e) {}
  });

  // Fallback: hide splash after 8s even if `load` never fires.
  setTimeout(function () {
    splash.classList.add('hidden');
  }, 8000);

  // webOS LG remote: Back key = 461. Close the app on Back.
  document.addEventListener('keydown', function (e) {
    var k = e.keyCode;
    // 461 = LG remote BACK, 27 = ESC (simulator)
    if (k === 461 || k === 27) {
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

  // Keep focus on the iframe so D-pad input is routed to YouTube TV.
  window.addEventListener('focus', function () {
    try { frame.contentWindow.focus(); } catch (e) {}
  });
})();
