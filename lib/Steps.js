import React from 'react';

export default class Steps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: props.currentStep
    };

    this._moveStep = this._moveStep.bind(this);
  }

  render() {
    let { currentStep } = this.state;
    return (
      <div className="steps-component">
        <div className="steps-content">
          {
            React.Children.map(this.props.children, (child, index) => {
              let stepNumber = index + 1;
              let isActive = currentStep === stepNumber;
              return <child.type key={index} index={index} stepNumber={stepNumber} isActive={isActive}>{child.props.children}</child.type>;
            })
          }
        </div>
        <div className="steps-nav">
          <button
            className="steps-nav-prev"
            onClick={() => {this._moveStep(currentStep - 1)}}
            disabled={currentStep === 1}
          >
            Prev
          </button>
          <button
            className="steps-nav-next"
            onClick={() => {this._moveStep(currentStep + 1)}}
            disabled={currentStep === this.props.children.length}
          >
            Next
          </button>
        </div>
      </div>
    );
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
  stepShouldChange: React.PropTypes.function
};

Steps.defaultProps = {
  currentStep: 1,
  stepShouldChange: () => {return true;}
};
