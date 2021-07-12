import React, { Component } from "react";
import { writerImg } from "../../static";
import "./AccountCard.css";
import { Link } from "react-router-dom";
import { routes } from "../router/routes";

class AccountCard extends Component {
  render() {
    return (
      <Link to={routes.VIEW_WRITER(this.props.username)}>
        <div className="aCard">
          <img
            src={this.props.img}
            onError={({ target }) => (target.src = writerImg)}
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
