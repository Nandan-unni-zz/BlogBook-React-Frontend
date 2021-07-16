import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";

class DeactivateAccount extends Component {
  render() {
    return (
      <div>
        <h2 className="sett-head">Deactivate Account</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(DeactivateAccount);
