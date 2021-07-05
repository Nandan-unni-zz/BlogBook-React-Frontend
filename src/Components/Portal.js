import React, { Component } from 'react';
import './Portal.css';

class Portal extends Component {
  render() {
    return (
      <div className="Portal">
        {this.props.children}
      </div>
    );
  }
}

export default Portal;
