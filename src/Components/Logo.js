import React, { Component } from 'react';

import './Logo.css';
import icon from '../Images/favicon.png';

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <div className="logo-text">
          <img src={icon} alt="Logo" style={{height: '3vh'}}/> &nbsp;
          <kb>Key Blogs</kb>
        </div>
      </div>
    );
  }
}

export default Logo;
