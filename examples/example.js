import React from 'react';
import ReactDOM from 'react-dom';

import { Steps, Step } from '../lib';

class Example extends React.Component {
  render() {
    return (
      <Steps currentStep={1}>
        <Step>
          Step1
        </Step>
        <Step>
          Step2
        </Step>
      </Steps>
      );
  }
}

ReactDOM.render(<Example/> , document.getElementById('example'));
