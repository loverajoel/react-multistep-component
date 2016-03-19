import React from 'react';
import Step from '../../components/Step';

import '!style!css!sass!./index.scss';

export default class Steps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStep: Number(this.props.settings.currentStep),
      totalSteps: React.Children.count(this.props.children),
      nextActive: this.props.settings.nextStatus() || true,
      prevActive: this.props.settings.prevStatus() || true
    };
    this.props.settings.stepChange(this.props.settings.currentStep);
  }

  render() {
    let isDisabled = (i) => {
      if (i <= this.state.currentStep) {
        return false;
      } else {
        return !this.props.allowAllSteps || true;
      }
    };
    return (
      <div className="steps-component">
        <div className="steps-navigator-by-steps">
          <ul>
            {
              this.props.children.map((child, index) => {
                let isActive = index === this.state.currentStep ? 'active-step' : '';
                return <li key={index} className={isActive} disabled={isDisabled(index)}>{index}</li>;
              })
            }
          </ul>
        </div>
        <div className="steps-content">
          {
            React.Children.map(this.props.children, (child, index) => {
              let isActive = index === this.state.currentStep ? 'active-step' : '';
              return <child.type key={index} isActive={isActive} index={index}>{child.props.children}</child.type>;
            })
          }
        </div>
        <div className="steps-navigator">
        {
          this.state.currentStep > 0 ? <div className="steps-nav-prev" onClick={this._goToStep.bind(this, this.state.currentStep-1)} disabled={this.props.settings.prevStatus()}>Prev</div> : null
        }
        {
          this.state.currentStep < this.state.totalSteps-1 ? <div className="steps-nav-next" onClick={this._goToStep.bind(this, this.state.currentStep+1)} disabled={this.props.settings.nextStatus()}>Next</div> : null
        }
        </div>
      </div>
    );
  }

  _goToStep(stepN) {
    this.props.settings.stepChange(stepN, () => {
      this.setState({
        currentStep: stepN
      });
    });
  }
}
