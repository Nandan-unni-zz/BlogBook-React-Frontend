import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";

class PrivacySettings extends Component {
  render() {
    return (
      <div>
        <h2 className="sett-head">Privacy Settings</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(PrivacySettings);
