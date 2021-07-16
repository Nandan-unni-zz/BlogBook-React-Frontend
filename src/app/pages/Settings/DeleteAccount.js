import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";

class DeleteAccount extends Component {
  render() {
    return (
      <div>
        <h2 className="sett-head">Delete Account</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, {})(DeleteAccount);
