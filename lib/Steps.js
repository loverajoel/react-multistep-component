import React from 'react';

export default class Steps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.currentStep
    };

    this._moveStep = this._moveStep.bind(this);
    this._printNav = this._printNav.bind(this);
  }

  render() {
    let { currentStep } = this.state;
    let { children } = this.props;
    return (
      <div className="steps-component">
        <ul className="steps-navigator">
          {
            this._printStepsLabel(children, currentStep)
          }
        </ul>
        <div className="steps-content">
          {
            this._printSteps(children, currentStep)
          }
        </div>
          {
            this._printNav(currentStep, children.length)
          }
      </div>
    );
  }

  _printStepsLabel(children, currentStep) {
    return (
      React.Children.map(children, (child, index) => {
        let isActive = index + 1 === currentStep ? 'active-step' : '';
        let { customNavigator } = child.props;
        return (
          <li key={index} className={isActive} onClick={() => {this._moveStep(index + 1)}}>
            {customNavigator ? customNavigator : index + 1}
          </li>
        )
      })
    )
  }

  _printSteps(children, currentStep) {
    return (
      React.Children.map(children, (child, index) => {
        let stepNumber = index + 1;
        let isActive = currentStep === stepNumber;
        // Detect sibling elements
        let isSibling = this.props.mountOnlySiblings ? currentStep + 1 === stepNumber || currentStep - 1 === stepNumber : true;
        return (
          // child.type === <Step/>
          <child.type key={index} index={index} stepNumber={stepNumber} isActive={isActive} isSibling={isSibling}>
            {child.props.children}
          </child.type>
        );
      })
    )
  }

  _printNav(currentStep, childrenLength) {
    return (
      <div className="steps-nav">
        <button
          className="steps-nav-prev"
          onClick={() => {this._moveStep(currentStep - 1)}}
          disabled={currentStep === 1}
        >
          {this.props.prevButton}
        </button>
        <button
          className="steps-nav-next"
          onClick={() => {this._moveStep(currentStep + 1)}}
          disabled={currentStep === childrenLength}
        >
          {this.props.nextButton}
        </button>
      </div>
    )
  }

  _moveStep(step) {
    if (this.props.stepShouldChange()) {
      this.setState({
        currentStep: step
      });
    }
  }
}

Steps.propTypes = {
  currentStep: React.PropTypes.number,
  stepShouldChange: React.PropTypes.func,
  mountOnlySiblings: React.PropTypes.bool
};

Steps.defaultProps = {
  currentStep: 1,
  stepShouldChange: () => {return true;},
  prevButton: 'Prev',
  nextButton: 'Next',
  mountOnlySiblings: false
};
