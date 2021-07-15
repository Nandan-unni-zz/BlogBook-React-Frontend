import "./index.css";

import { Component } from "react";
import { Navbar } from "../../components";

class Settings extends Component {
  render() {
    return (
      <div className="settings-wrapper">
        <Navbar feed profile logout />
      </div>
    );
  }
}

export default Settings;
