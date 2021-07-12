import "./index.css";

import { Component } from "react";
import { Button as AntdButton } from "antd";

class Button extends Component {
  render() {
    return (
      <AntdButton
        className={`Button ${this.props.className}`}
        disabled={this.props.disabled}
        href={this.props.href}
        icon={this.props.icon}
        loading={this.props.loading}
        htmlType={this.props.htmlType}
        onClick={this.props.onClick}
        size={this.props.size}
        type={this.props.type}
      >
        {this.props.children}
      </AntdButton>
    );
  }
}

export default Button;
