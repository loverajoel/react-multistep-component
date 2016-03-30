## React Multistep Component

`react-multistep-component` is a multistep/wizard component for React

[![build status](https://img.shields.io/travis/loverajoel/react-multistep-component/master.svg?style=flat-square)](https://travis-ci.org/loverajoel/react-multistep-component)
[![npm version](https://img.shields.io/npm/v/react-multistep-component.svg?style=flat-square)](https://www.npmjs.com/package/react-multistep-component)
[![Coverage Status](https://coveralls.io/repos/github/loverajoel/react-multistep-component/badge.svg?branch=master)](https://coveralls.io/github/loverajoel/react-multistep-component?branch=master)
[![Dependencies status](https://david-dm.org/loverajoel/react-multistep-component.svg)](https://david-dm.org/loverajoel/react-multistep-component)
[![Dev dependencies status](https://david-dm.org/loverajoel/react-multistep-component/dev-status.svg)](https://david-dm.org/loverajoel/react-multistep-component#info=devDependencies)

### Installation

Using npm
```
npm install react-multistep-component
```

### Examples

- [Multistep Form](https://output.jsbin.com/luyokuf) - (jsBin)
- [Multistep Form with validation](https://output.jsbin.com/yijopa) - (jsBin)

### Usage

```js

import { Steps, Step } from 'react-multistep-component';

{
  /*
   * <Steps/> it's the container and wrapper for your steps.
   *
   * `currentStep` is the selected step when first render. By default the first (1) step will
   * be selected. *optional
   *
   * `stepShouldChange` is called whenever a step is changed. This method can be used for
   * validations. By default will return `true`. *optional
   *
   * `prevButton`/`nextButton` is a wrapper for the buttons, `html`, `jsx` or `string` can be included.
   * ex: `prevButton={<span><img src="..."/>Step 1</span>}`. *optional
   *
   * `mountOnlySiblings` if it's set `true`, only the siblings of the currently active  step will be
   * render. This is an improvement for big implementations.
   *
   */
}
<Steps currentStep={2}>
  {
    /*
     * <Step/> it's the wrapper for your step content. All content inside this will be tranclude.
     *
     * `customNavigator` `html`, `jsx` or `string` that will be used as a label of the step. *optional
     *
     */
  }
  <Step>
    Example Step 1
    <span>Hello step 1</span>
  <Step/>
  <Step>
    <div>
      Javascript Rocks!
    </div>
  <Step/>
</Steps>

```

### Styles

By default the component doesn't contain styles, but there are a couple of themes that you can use
in the [examples](https://github.com/loverajoel/react-multistep-component#examples)

## Todo

- Add `react-router` support
- Add `redux` support
- Add key events
- Add more examples

### Licence
MIT
