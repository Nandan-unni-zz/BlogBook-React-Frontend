import React, { Component } from "react";
import { Form, Input } from "antd";
import { Redirect, Link } from "react-router-dom";

import { Button, Logo, Portal, Navbar } from "../../components";
import { loginWriterAPI } from "../../../services/writer";
import { routes } from "../../router/routes";

class LoginWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMsg: "",
      isSuccess: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value, errMsg: "" });
  };
  handleSubmit = async () => {
    const response = await loginWriterAPI({
      email: this.state.email,
      password: this.state.password,
    });
    console.log(response.status);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      if (localStorage.getItem("user")) this.setState({ isSuccess: true });
    } else this.setState({ errMsg: "Invalid email or password." });
  };
  render() {
    return (
      <div className="LoginAccount">
        <Logo />
        <Navbar />
        <Portal>
          <Form onFinish={this.handleSubmit} layout="vertical">
            <h2>Log In</h2>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter an email to login" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Enter your passoword to login" },
              ]}
            >
              <Input.Password size="large" onChange={this.handleChange} />
            </Form.Item>
            <span>
              {!localStorage.getItem("user") ? (
                <err>{this.state.errMsg}</err>
              ) : (
                <Redirect to="/feed/" />
              )}
            </span>
            <Form.Item>
              <div className="submit">
                <Button class="normal">Log In</Button>
                <Link to={routes.CREATE_WRITER}>Don't have an account ?</Link>
              </div>
            </Form.Item>
          </Form>
        </Portal>
      </div>
    );
  }
}

export default LoginWriter;
