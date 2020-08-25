import React, { Component } from 'react';

import './Navbar.css';

class Navbar extends Component {
  render() {
    if (window.innerWidth > 575) {
      return (
        <div className="Navbar expand" id="Navbar">
          {this.props.children}
        </div>
      );
    }
    else {
      return (
        <div className="Navbar collapse" id="Navbar">
          {this.props.children}
        </div>
      );
    }
    
  }
}

export default Navbar;
