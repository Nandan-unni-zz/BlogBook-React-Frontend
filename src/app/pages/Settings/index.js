import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";

import { Navbar } from "../../components";
import AccountSettings from "./AccountSettings";
import PrivacySettings from "./PrivacySettings";
import DeactivateAccount from "./DeactivateAccount";
import DeleteAccount from "./DeleteAccount";
import { setTab } from "../../../store/settings/actions";

class Settings extends Component {
  render() {
    return (
      <div className="settings-wrapper">
        <Navbar backBtn feed profile logout />
        <div className="settings">
          <menu className="settings-menu">
            <nav
              className={`${this.props.settings.tab === 1 ? "active" : ""}`}
              onClick={() => this.props.setTab(1)}
            >
              <span className="material-icons">settings</span>
              <p>Account Settings</p>
            </nav>
            <nav
              className={`${this.props.settings.tab === 2 ? "active" : ""}`}
              onClick={() => this.props.setTab(2)}
            >
              <span className="material-icons">settings</span>
              <p>Privacy Settings</p>
            </nav>
            <nav
              className={`${this.props.settings.tab === 3 ? "active" : ""}`}
              onClick={() => this.props.setTab(3)}
            >
              <span className="material-icons">settings</span>
              <p>Deactivate my Account</p>
            </nav>
            <nav
              className={`${this.props.settings.tab === 4 ? "active" : ""}`}
              onClick={() => this.props.setTab(4)}
            >
              <span className="material-icons">settings</span>
              <p>Delete my Account</p>
            </nav>
          </menu>
          <section>
            {this.props.settings.tab === 1 ? (
              <AccountSettings />
            ) : this.props.settings.tab === 2 ? (
              <PrivacySettings />
            ) : this.props.settings.tab === 3 ? (
              <DeactivateAccount />
            ) : this.props.settings.tab === 4 ? (
              <DeleteAccount />
            ) : (
              this.props.setTab(1)
            )}
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, { setTab })(Settings);
