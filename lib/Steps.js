import React from 'react';

// import '!style!css!sass!./index.scss';

export default class Steps extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="steps-component">
        <div className="steps-content">
          {
            React.Children.map(this.props.children, (child, index) => {
              let stepNumber = index + 1;
              let isActive = this.props.currentStep === stepNumber;
              return <child.type key={index} index={index} stepNumber={stepNumber} isActive={isActive}>{child.props.children}</child.type>;
            })
          }
        </div>
        <div className="steps-nav">
          <div>Prev</div>
          <div>Next</div>
        </div>
      </div>
    );
  }
}


Steps.propTypes = {
  currentStep: React.PropTypes.number
};

Steps.defaultProps = {
  currentStep: 1
};
