# YouTube TV — webOS launcher

A minimal LG webOS TV app that opens `https://www.youtube.com/tv` fullscreen.

## Project layout

```
.
├── appinfo.json     # webOS app manifest
├── index.html       # entry; hosts the YouTube TV iframe
├── css/style.css
├── js/app.js        # splash + remote Back-key handling
├── icon.png         # 80x80 launcher icon (replace with real art)
├── largeIcon.png    # 130x130 launcher icon
└── package.json     # convenience npm scripts wrapping ares-*
```

## Prerequisites

1. **Node 18+**
2. **webOS TV CLI**
   ```sh
   npm i -g @webosose/ares-cli
   ```
3. **Developer Mode** enabled on the LG TV (install the *Developer Mode* app from the LG Content Store, sign in, enable Dev Mode, note the IP + passphrase).
4. Register the TV as a target device:
   ```sh
   ares-setup-device
   ```
   Add a device named `tv` with the TV's IP, port `9922`, user `prisoner`, and the developer key from the Dev Mode app.

## Build, install, run

```sh
npm run deploy        # package + install + launch on the TV
```

Or step by step:

```sh
ares-package . -o dist
ares-install --device tv dist/com.vasanth.youtubetv_1.0.0_all.ipk
ares-launch  --device tv com.vasanth.youtubetv
```

## Debug

```sh
ares-inspect --device tv --app com.vasanth.youtubetv
```

Opens Chrome DevTools attached to the running app.

## Icons

`icon.png` (80×80) and `largeIcon.png` (130×130) are placeholders. Replace with
your own PNGs of the same dimensions before shipping.

## Notes

- YouTube's `/tv` endpoint is built for 10-foot UIs and already handles D-pad
  navigation, so no extra spatial-navigation library is needed.
- The LG remote **Back** key (keyCode `461`) closes the app via
  `webOS.platformBack()`. ESC works the same way in the simulator.
- If the iframe ever stops loading (Google occasionally tightens framing
  policies on `/tv`), swap the iframe in [index.html](index.html) for a
  full-page navigation:
  ```js
  window.location.replace('https://www.youtube.com/tv');
  ```
