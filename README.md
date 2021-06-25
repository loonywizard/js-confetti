

<img src="app-demo.gif" />

# 🎉 JavaScript Confetti library

[![npm version](https://badge.fury.io/js/js-confetti.svg)](https://badge.fury.io/js/js-confetti)
![NPM Downloads](https://img.shields.io/npm/dw/js-confetti)
[![](https://data.jsdelivr.com/v1/package/npm/js-confetti/badge?style=rounded)](https://www.jsdelivr.com/package/npm/js-confetti)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/js-confetti)


✅ Zero dependencies used<br/>
✅ Works without any config, yet could be configured<br/>
✅ Has TypeScript typings<br/>
✅ Confetti speed adapts to user screen width

Links: [GitHub](https://github.com/loonywizard/js-confetti) | [NPM](https://www.npmjs.com/package/js-confetti) | [Library Website](https://loonywizard.github.io/js-confetti/) | [CodeSandbox Playground](https://codesandbox.io/s/confetti-vanilla-js-r5kqi)


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

## Customise confetties

Customize confetties colors:

<img src="assets/custom-color.gif" width="500px" />

```js
jsConfetti.addConfetti({
  confettiColors: [
    '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
  ],
})
```

<br/>
Customize confetties radius:

<img src="assets/custom-radius.gif" width="500px" />

```js
jsConfetti.addConfetti({
  confettiRadius: 6,
})
```

<br/>
Customize confetties number:

<img src="assets/custom-confetties-number.gif" width="500px" />

```js
jsConfetti.addConfetti({
  confettiRadius: 6,
  confettiesNumber: 500,
})
```

## License
MIT
