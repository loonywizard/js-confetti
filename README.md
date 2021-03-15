# js-confetti

[![npm version](https://badge.fury.io/js/js-confetti.svg)](https://badge.fury.io/js/js-confetti)
![NPM Downloads](https://img.shields.io/npm/dw/js-confetti)

🎉 JavaScript Confetti library
- zero dependencies used!
- works without any config! (but could be configured if needed)
- confetti speed adapts to user screen width

Demo: https://loonywizard.github.io/js-confetti/

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

### addConfetti args

`addConfetti` method accepts args object with the following params:

| Prop             | Type        |  Description                             | Default value         |
| ---------------- | ----------- | ---------------------------------------- | --------------------- |
| confettiRadius   | number      | Radius of confetti shape in pixels       | 10                    |
| confettiesNumber | number      | Number of confetties to fire             | 200                   |
| confettiColors   | string[]    | Array of colors for confetti             | Array of RGB colors   |


```js
jsConfetti.addConfetti({
  confettiRadius: 10,
  confettiesNumber: 200,
  confettiColors: ['#fcf403', '#62fc03', '#f4fc03', '#03e7fc', '#03fca5', '#a503fc', '#fc03ad', '#fc9003']
})
```
