import React, { Component } from "react";
import "./Auth.css";
import Layout from "./Layout";

import { Form, Input, message, Button } from "antd";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import { createWriterAPI } from "../../../services/writer";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portalMsg: "",
      portalErr: "",
      isSubmitting: false,
      isSuccess: false,
      isMailed: true,
    };
  }
  handleSignup = (values) => {
    if (values.password === values.cpassword) {
      this.setState({
        isSubmitting: true,
        portalErr: "",
        portalMsg: "Sending verification mail...",
      });
      createWriterAPI({
        name: values.name,
        email: values.email,
        username: values.email,
        password: values.password,
      }).then((res) => {
        this.setState({ isSubmitting: false });
        if (res.status === 201) {
          message.success(
            "Account created successfully ! Please check your mail to verify your account."
          );
          this.setState({ portalMsg: "", isSuccess: true });
          window.location.href = routes.SUCCESS;
        } else if (res.status === 204) {
          message.success(
            "Account created successfully ! Please login to continue."
          );
          this.setState({
            errMsg: "Email sending failed. Server Error",
            isMailed: false,
          });
          window.location.href = routes.LOGIN;
        } else {
          message.error("Email already in use !");
          this.setState({ portalMsg: "", portalErr: "Email already in use." });
        }
      });
    } else {
      message.error("Passwords didn't match");
      this.setState({ portalMsg: "", portalErr: "Passwords didn't match" });
    }
  };
  render() {
    return (
      <Layout>
        <div className="portal portal-signup">
          <h2>Signup</h2>
          <Form layout="vertical" onFinish={this.handleSignup}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please provide your name" }]}
            >
              <Input size="large" placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Please enter a valid email" },
                { required: true, message: "Email is required" },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  min: 8,
                  message: "Enter a strong password. Min 8 characters",
                },
                { required: true, message: "Password is required" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter a password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="cpassword"
              rules={[
                {
                  min: 8,
                  message: "Enter a strong password. Min 8 characters",
                },
                { required: true, message: "Re enter your password" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re enter the password"
              />
            </Form.Item>
            <br />
            {this.state.portalErr && (
              <p className="portal-err">{this.state.portalErr}</p>
            )}
            {this.state.portalMsg && (
              <p className="portal-msg">{this.state.portalMsg}</p>
            )}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="portal-submit"
                loading={this.state.isSubmitting}
              >
                Signup
              </Button>
            </Form.Item>
            <Link to={routes.HOME}>Already have an account ?</Link>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default Signup;
