import "./index.css";

import { Component } from "react";
import { Link } from "react-router-dom";

import { writerPlaceholder } from "../../../static";
import { routes } from "../../router/routes";

class AccountCard extends Component {
  render() {
    return (
      <Link to={routes.PROFILE(this.props.username)}>
        <div className="aCard">
          <img
            src={this.props.img}
            onError={({ target }) => (target.src = writerPlaceholder)}
            alt={this.props.username}
          />
          <div className="aCard-dtl">
            <h4>{this.props.username}</h4>
            <p>{this.props.name}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default AccountCard;
