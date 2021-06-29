
<img src="assets/app-demo.gif" width="600px" />


[![npm version](https://badge.fury.io/js/js-confetti.svg)](https://badge.fury.io/js/js-confetti)
![NPM Downloads](https://img.shields.io/npm/dw/js-confetti)
[![](https://data.jsdelivr.com/v1/package/npm/js-confetti/badge?style=rounded)](https://www.jsdelivr.com/package/npm/js-confetti)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/js-confetti)

# 🎉 JavaScript Confetti library

💥 Supports emojis as confetti<br/>
⚡️ Zero dependencies used<br/>
🦄 Works without any config, yet configurable<br/>
🛠 Has TypeScript typings<br/>
🧩 Confetti speed adapts to user screen width

Links: [GitHub](https://github.com/loonywizard/js-confetti) | [NPM](https://www.npmjs.com/package/js-confetti) | [Demo](https://loonywizard.github.io/js-confetti/)


## Install

You can install library from NPM using yarn or npm

```sh
yarn add js-confetti
```

Alternatively you can download script from CDN
```html
<script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
```

and then access `JSConfetti` global variable

## Usage

Initialize instance of JSConfetti class and call addConfetti method

```js
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

jsConfetti.addConfetti()
```

*NOTE* `new JSConfetti()` creates HTML Canvas element and adds it to page, so call it only once!

## Customise confetti

Use emojis as confetti:

```js
jsConfetti.addConfetti({
   emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
})
```

<br/>

Customize confetti colors:

```js
jsConfetti.addConfetti({
  confettiColors: [
    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
  ],
})
```

<br/>

Customize confetti radius:

```js
jsConfetti.addConfetti({
  confettiRadius: 6,
})
```

<br/>

Customize confetti number:

```js
jsConfetti.addConfetti({
  confettiRadius: 6,
  confettiNumber: 500,
})
```

<br/>

Combine different properties:

```js
jsConfetti.addConfetti({
  emojis: ['🦄'],
  emojiSize: 100,
  confettiNumber: 30,
})
```

## License
MIT
