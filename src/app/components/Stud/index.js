import "./index.css";

import { Component } from "react";
import { Tooltip } from "antd";

class Stud extends Component {
  state = {
    hover: false,
  };

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
