

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

`addConfetti` method accepts args object with the following params:

| Prop             | Type        |  Description                             | Default value         |
| ---------------- | ----------- | ---------------------------------------- | --------------------- |
| confettiRadius   | number      | Radius of confetti shape in pixels       | 8                     |
| confettiesNumber | number      | Number of confetties to fire             | 200                   |
| confettiColors   | string[]    | Array of colors for confetti             | Array of RGB colors   |

<br/>

```js
jsConfetti.addConfetti({
  confettiRadius: 8,
  confettiesNumber: 200,
  confettiColors: ['#fcf403', '#62fc03', '#f4fc03', '#03e7fc', '#03fca5', '#a503fc', '#fc03ad', '#fc03c2']
})
```
