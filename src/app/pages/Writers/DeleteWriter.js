import React, { Component } from "react";
import { Form, Input } from "antd";
import { Redirect, Link } from "react-router-dom";

import { Button, Logo, Portal, Navbar } from "../../components";
import { deleteWriterAPI } from "../../../services/writer";
import { routes } from "../../router/routes";

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      password: "",
      isSuccess: false,
      errMsg: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = async () => {
    const response = await deleteWriterAPI(this.state.user.username, {
      password: this.state.password,
    });
    console.log(response.status);
    if (response.status === 204) {
      this.setState({ errMsg: "" });
      localStorage.removeItem("user");
      this.setState({ isSuccess: true });
    } else this.setState({ errMsg: "Wrong password." });
  };
  render() {
    return (
      <div className="DeleteAccount">
        <Logo />
        <Navbar />
        <br />
        <br />
        <br />
        <Portal>
          <Form onFinish={this.handleSubmit}>
            <center>
              <h2>Delete Account</h2>
            </center>
            <br />
            <label for="password">Enter Password</label>
            <br />
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter your passoword to confirm delete",
                },
              ]}
            >
              <Input.Password onChange={this.handleChange} />
            </Form.Item>
            <center>
              {!this.state.isSuccess ? (
                <err>{this.state.errMsg}</err>
              ) : (
                <Redirect to="/" />
              )}
            </center>
            <br />

            <Form.Item>
              <center>
                <Button className="danger">Delete Account</Button>
                <br />
                <Link to={routes.VIEW_WRITER(this.state.user.username)}>
                  Cancel
                </Link>
              </center>
            </Form.Item>
          </Form>
        </Portal>
      </div>
    );
  }
}

export default DeleteAccount;
