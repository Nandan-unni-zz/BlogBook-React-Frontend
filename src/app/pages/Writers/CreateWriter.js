import React, { Component } from "react";
import { Form, Input } from "antd";
import { Redirect, Link } from "react-router-dom";

import { Button, Logo, Portal, Navbar } from "../../components";
import { createWriterAPI } from "../../../services/writer";
import { routes } from "../../router/routes";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      isSuccess: false,
      isMailed: true,
      errMsg: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = async () => {
    let res;
    this.setState({ errMsg: "Please wait..." });
    if (this.state.password === this.state.cpassword) {
      this.setState({ errMsg: "Sending verification mail..." });
      res = await createWriterAPI({
        name: this.state.name,
        email: this.state.email,
        username: this.state.email,
        password: this.state.password,
      });
      console.log(res.status);
      if (res.status === 201) this.setState({ isSuccess: true });
      if (res.status === 204)
        this.setState({
          errMsg: "Email sending failed. Server Error",
          isMailed: false,
        });
      else this.setState({ errMsg: "Email already in use." });
    } else this.setState({ errMsg: "Passwords didn't match" });
  };
  render() {
    return (
      <div className="CreateAccount">
        <Logo />
        <Navbar />
        <Portal>
          <Form onFinish={this.handleSubmit} layout="vertical">
            <h2>Create Account</h2>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please provide your name",
                },
                {
                  min: 4,
                  message: "Name must contain min 4 characters",
                },
              ]}
            >
              <Input size="large" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  min: 4,
                  message: "Please enter a verified email",
                },
              ]}
            >
              <Input size="large" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item
              label="Paswword"
              name="password"
              rules={[
                { required: true, message: "Please type a password" },
                {
                  min: 4,
                  message: "Enter a strong password (min 4 characters)",
                },
              ]}
            >
              <Input.Password size="large" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="cpassword"
              rules={[
                {
                  required: true,
                  min: 4,
                  message: "Re-enter your passoword to confirm",
                },
              ]}
            >
              <Input.Password size="large" onChange={this.handleChange} />
            </Form.Item>
            <span>
              {!this.state.isSuccess ? (
                <err>{this.state.errMsg}</err>
              ) : (
                <Redirect to={routes.SUCCESS} />
              )}
            </span>
            <p>{!this.state.isMailed && <Redirect to={routes.LOGIN} />}</p>
            <br />

            <Form.Item>
              <div className="submit">
                <Button class="normal">Create Account</Button>
                <Link to={routes.LOGIN}>Already have an account ?</Link>
              </div>
            </Form.Item>
          </Form>
        </Portal>
      </div>
    );
  }
}

export default CreateAccount;
