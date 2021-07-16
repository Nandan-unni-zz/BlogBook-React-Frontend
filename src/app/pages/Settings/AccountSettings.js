import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";

class AccountSettings extends Component {
  render() {
    return (
      <div>
        <h2 className="sett-head">Account Settings</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(AccountSettings);
