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

});
