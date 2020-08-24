import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <div className="Button">
        <a href={this.props.href} className={this.props.class}>
            <button onClick={this.props.onClick}>
                {this.props.children}
            </button>
        </a>
      </div>
    );
  }
}

export default Button;
