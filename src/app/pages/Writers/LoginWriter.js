import React, { Component } from "react";
import { Form, Input } from "antd";
import { Redirect } from "react-router-dom";

import { Button, Logo, Portal } from "../../components";
import { loginWriterAPI } from "../../../services/writer";

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
        <Logo></Logo>
        <br />
        <br />
        <br />
        <Portal>
          <Form onFinish={this.handleSubmit}>
            <center>
              <h2>Log In</h2>
            </center>
            <br />

            <label for="email">Email</label>
            <br />
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter a verified email" },
              ]}
            >
              <Input onChange={this.handleChange} />
            </Form.Item>

            <label for="password">Password</label>
            <br />
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Enter your passoword to login" },
              ]}
            >
              <Input.Password onChange={this.handleChange} />
            </Form.Item>
            <center>
              {!localStorage.getItem("user") ? (
                <err>{this.state.errMsg}</err>
              ) : (
                <Redirect to="/feed/" />
              )}
            </center>
            <br />
            <Form.Item>
              <center>
                <Button class="normal">Log In</Button>
                <br />
                <a href="/writer/create/">Don't have an account ?</a>
              </center>
            </Form.Item>
          </Form>
        </Portal>
      </div>
    );
  }
}

export default LoginWriter;
