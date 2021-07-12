import { Tooltip } from "antd";
import React, { Component } from "react";

import "./Stud.css";

class Stud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    // this.method = this.method.bind(this);
  }
  render() {
    return (
      <Tooltip overlay={this.props.type} placement="top">
        <div
          className="Stud"
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          style={{
            color:
              this.state.hover || this.props.active
                ? this.props.theme
                : "rgb(150, 150, 150)",
          }}
        >
          <p>{this.props.count}</p>
          &nbsp;
          <span
            className="material-icons"
            style={{
              backgroundColor: this.state.hover
                ? this.props.theme + "33"
                : "transparent",
            }}
          >
            {this.props.active ? this.props.icon : this.props.icon + "_border"}
          </span>
        </div>
      </Tooltip>
    );
  }
}

export default Stud;
