import React, { Component } from 'react';

const Step = ({stepNumber, isActive, isSibling, children}) => (
  <div
    className={`step-item step-${stepNumber} active-${isActive}`}
    style={{display: isActive ? 'block' : 'none'}}
  >
    {isActive || isSibling ? children : ''}
  </div>
);

export default Step;
