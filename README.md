# Keyboard Focus [<img src="https://jonathantneal.github.io/js-logo.svg" alt="JavaScript Logo" width="90" height="90" align="right">][Keyboard Focus]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Gitter Chat][git-img]][git-url]

[Keyboard Focus] lets you detect when an element has received focus
from a keyboard instead of a pointer, such as a mouse or touch input.

[Keyboard Focus] adds a `keyboard-focus` attribute to any focused element that
is given focus by a keyboard.

This can be used to style components specifically if focus is triggered by a
keyboard or not:

```css
/* hide the focus indicator when triggered by a pointer (touch, mouse, etc.) */

:focus:not([keyboard-focus]) {
  outline-width: 0;
}
```

## Usage

Add [Keyboard Focus] to your build tool:

```bash
npm install keyboard-focus --save-dev
```

Activate [Keyboard Focus] on the `document`:

```js
import keyboardFocus from 'keyboard-focus';

keyboardFocus(document);
```

## Difference between `[keyboard-focus]` and `.focus-visible`

The `.focus-visible` class applies while an element matches the `:focus`
pseudo-class _and_ the UA determines via heuristics that the focus should be
made evident on the element.

The `[keyboard-focus]` attribute-selector applies while an element matches the
`:focus` pseudo-class regardless of these heuristics.

### License

[Keyboard Focus] is licensed under the [W3C Software License] which is also GPL,
MIT, and BSD compatible.

[Keyboard Focus] is forked from the [focus-visible] polyfill, and includes
substantial material copied from their excellent efforts.

[npm-url]: https://www.npmjs.com/package/keyboard-focus
[npm-img]: https://img.shields.io/npm/v/keyboard-focus.svg
[cli-url]: https://travis-ci.org/jonathantneal/keyboard-focus
[cli-img]: https://img.shields.io/travis/jonathantneal/keyboard-focus.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[focus-visible]: https://github.com/WICG/focus-visible
[Keyboard Focus]: https://github.com/jonathantneal/keyboard-focus
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[W3C Software License]: https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
