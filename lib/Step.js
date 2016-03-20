import React from 'react';

export default class Step extends React.Component {
  render() {
    return (
      <div
        className={'step-item step-' + this.props.stepNumber + ' active-' + this.props.isActive}
        style={{display: this.props.isActive ? 'block' : 'none'}}
      >
        {this.props.children}
      </div>
    );
  }
}
