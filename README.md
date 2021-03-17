

<p align="center"><img src="app-demo.gif" /></p>


<h1 align="center">🎉 JavaScript Confetti library</h1>

<p align="center">
  <a href="https://badge.fury.io/js/js-confetti.svg">
    <img src="https://badge.fury.io/js/js-confetti.svg"></a>
  <a href="https://img.shields.io/npm/dw/js-confetti">
    <img src="https://img.shields.io/npm/dw/js-confetti"></a>
  <a href="https://img.shields.io/bundlephobia/minzip/js-confetti">
    <img src="https://img.shields.io/bundlephobia/minzip/js-confetti"></a>
</p>

js-confetti is a lightweight zero-config open-source JavaScript library for confetti without any dependencies

Links: [GitHub](https://github.com/loonywizard/js-confetti) | [Library Website](https://loonywizard.github.io/js-confetti/) | [CodeSandbox Playground](https://codesandbox.io/s/confetti-vanilla-js-r5kqi)

## Usage

Install library via yarn or npm

```sh
yarn add js-confetti
```

Initialize instance of JSConfetti class and call addConfetti method

```js
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

jsConfetti.addConfetti()
```

**⚠️ Attencion ⚠️** `new JSConfetti()` creates HTML Canvas element and adds it to page, so call it only once!

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
