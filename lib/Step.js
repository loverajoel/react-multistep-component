import React, { Component } from 'react';

const Step = ({stepNumber, isActive, children}) => (
  <div
    className={`step-item step-${stepNumber} active-${isActive}`}
    style={{display: isActive ? 'block' : 'none'}}
  >
    {children}
  </div>
);

export default Step;
