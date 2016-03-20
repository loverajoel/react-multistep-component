import expect from 'expect';
import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { Steps, Step } from '../index';

let testRender = (component) => {
  return TestUtils.renderIntoDocument(component);
};

describe('Steps',() => {

  it('should exists',() => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
      </Steps>
    );
    expect(TestUtils.isCompositeComponent(myComponent)).toBeTruthy();
  });

  it('should render the two childs',() => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Steps>
    );
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'step-item');
    expect(steps.length).toEqual(3);
  });

  it('should be active by default the first Step',() => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].textContent).toEqual('Step 1');
  });

  it('should be active the second Step when pass currentStep property',() => {
    let myComponent = testRender(
      <Steps currentStep={2}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].textContent).toEqual('Step 2');
  });

  it('should render Navs',() => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nav = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav');
    expect(nav.length).toEqual(1);
  });

  it('should be change of step when click in the next nav button',() => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    TestUtils.Simulate.click(nextButton[0]);
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].style.display).toEqual('block');
    expect(steps[0].textContent).toEqual('Step 2');
  });

  it('should be change of step when click in the prev nav button',() => {
    let myComponent = testRender(
      <Steps currentStep={2}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-prev');
    TestUtils.Simulate.click(nextButton[0]);
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].style.display).toEqual('block');
    expect(steps[0].textContent).toEqual('Step 1');
  });

  it('should fail when click in the next nav button',() => {
    let stepShouldChange = () => {
      return false;
    };

    let myComponent = testRender(
      <Steps stepShouldChange={stepShouldChange}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    TestUtils.Simulate.click(nextButton[0]);
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].textContent).toEqual('Step 1');
  });

  it('should change of step when click in the next nav button',() => {
    let stepShouldChange = () => {
      return true;
    };

    let myComponent = testRender(
      <Steps stepShouldChange={stepShouldChange}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    TestUtils.Simulate.click(nextButton[0]);
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].textContent).toEqual('Step 2');
  });

  it('should have disabled the prev button when the currentStep is 1', () => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let prevButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-prev');
    expect(prevButton[0].disabled).toEqual(true);
  });

  it('should have enabled the prev button when the currentStep is > 1', () => {
    let myComponent = testRender(
      <Steps currentStep={2}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let prevButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-prev');
    expect(prevButton[0].disabled).toEqual(false);
  });

  it('should have disabled the next button when the currentStep is the last', () => {
    let myComponent = testRender(
      <Steps currentStep={2}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    expect(nextButton[0].disabled).toEqual(true);
  });

  it('should have enabled the next button when the currentStep is < last', () => {
    let myComponent = testRender(
      <Steps currentStep={2}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    expect(nextButton[0].disabled).toEqual(false);
  });

  it('should render default content in next and prev button', () => {
    let myComponent = testRender(
      <Steps currentStep={1}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Steps>
    );
    let nextBtn = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    let prevBtn = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-prev');
    expect(nextBtn[0].textContent).toEqual('Next');
    expect(prevBtn[0].textContent).toEqual('Prev');
  });

  it('should render custom content in next and prev button', () => {
    let nextButton = (<span>NeXt</span>)
    let myComponent = testRender(
      <Steps currentStep={1} prevButton='pReV' nextButton={nextButton}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Steps>
    );
    let nextBtn = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    let prevBtn = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-prev');
    expect(nextBtn[0].children[0].tagName).toEqual('SPAN');
    expect(nextBtn[0].children[0].textContent).toEqual('NeXt');
    expect(prevBtn[0].textContent).toEqual('pReV');
  });

  it('should render the navigator', () => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let navigatorElem = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-navigator');
    expect(navigatorElem[0].children.length).toEqual(2);
    expect(navigatorElem[0].children[0].className).toEqual('active-step');
  });

  it('should update the navigator when click in next', () => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
      </Steps>
    );
    let nextButton = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-nav-next');
    TestUtils.Simulate.click(nextButton[0]);
    let navigatorElem = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-navigator');
    expect(navigatorElem[0].children[1].className).toEqual('active-step');
  });

  it('should show custom navigator item', () => {
    let myComponent = testRender(
      <Steps>
        <Step customNavigator={'helloStep1'}>Step 1</Step>
        <Step customNavigator={<div>Hello Step 2</div>}>Step 2</Step>
      </Steps>
    );
    let navigatorElem = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-navigator');
    expect(navigatorElem[0].children[0].textContent).toEqual('helloStep1');
    expect(navigatorElem[0].children[1].children[0].tagName).toEqual('DIV');
    expect(navigatorElem[0].children[1].textContent).toEqual('Hello Step 2');
  });

  it('should show custom navigator item', () => {
    let myComponent = testRender(
      <Steps>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Steps>
    );
    let navigatorElem = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'steps-navigator');
    TestUtils.Simulate.click(navigatorElem[0].children[1]);
    let steps = TestUtils.scryRenderedDOMComponentsWithClass(myComponent, 'active-true');
    expect(steps[0].textContent).toEqual('Step 2');
    expect(navigatorElem[0].children[1].className).toEqual('active-step');
  });

});
