# js-confetti

[![npm version](https://badge.fury.io/js/js-confetti.svg)](https://badge.fury.io/js/js-confetti)
![NPM Downloads](https://img.shields.io/npm/dw/js-confetti)

🎉 JS Confetti library with zero dependencies

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

| Prop             | Type        |  Description                                                        | Default value |
| ---------------- | ----------- | ------------------------------------------------------------------- | ------------- |
| confettiRadius   | number      | Radius of confetti shape in pixels                                  | 10            |
| confettiesNumber | number      | Number of confetties to fire (N / 2 for each side - left and right) | 200           |

```js
jsConfetti.addConfetti({
  confettiRadius: 10,
  confettiesNumber: 200,
})
```
