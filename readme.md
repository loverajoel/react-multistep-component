## React Multistep Component

`react-multistep-component` is a multistep/wizard component for React

### Installation

Using npm
```
npm install react-multistep-component
```

### Live Demo

[Simple Demo [jsbin]](https://jsbin.com/luyokuf/edit?output)

### Example

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

### Licence
MIT
