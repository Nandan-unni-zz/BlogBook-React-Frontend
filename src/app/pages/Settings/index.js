import "./index.css";

import { Component } from "react";
import { Navbar } from "../../components";

class Settings extends Component {
  render() {
    return (
      <div className="settings-wrapper">
        <Navbar feed profile logout />
        <div className="settings">
          <menu>
            <nav>
              <span className="material-icons">settings</span>
              <p>Account Settings</p>
            </nav>
            <nav>
              <span className="material-icons">settings</span>
              <p>Privacy Settings</p>
            </nav>
            <nav>
              <span className="material-icons">settings</span>
              <p>Deactivate my Account</p>
            </nav>
            <nav>
              <span className="material-icons">settings</span>
              <p>Delete my Account</p>
            </nav>
          </menu>
          <section></section>
        </div>
      </div>
    );
  }
}

export default Settings;
