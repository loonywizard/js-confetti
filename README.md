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

### addConfetti config

```js
jsConfetti.addConfetti({
  confettiRadius: 10,
})
```

| Prop           | Type        | Default value |
| -------------- | ----------- | ------------- |
| confettiRadius | number      | 10            |


## Warning!

Work in Progress
