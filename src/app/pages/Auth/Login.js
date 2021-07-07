import React, { Component } from "react";
import "./Auth.css";
import Layout from "./Layout";

import { Form, Input, message, Button } from "antd";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import { loginWriterAPI } from "../../../services/writer";

class Login extends Component {
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
  handleLogin = (values) => {
    this.setState({ isSubmitting: true });
    loginWriterAPI({
      email: values.email,
      password: values.password,
    }).then((res) => {
      this.setState({ isSubmitting: false });
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        if (localStorage.getItem("user")) {
          this.setState({ portalMsg: "", isSuccess: true });
        }
        window.location.href = routes.FEED;
      } else {
        message.error("Invalid email or password !");
        this.setState({
          portalMsg: "",
          portalErr: "Invalid email or password.",
        });
      }
    });
  };
  render() {
    return (
      <Layout>
        <div className="portal portal-login">
          <h2>Login</h2>
          <Form onFinish={this.handleLogin} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Enter your email to login" }]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Enter your username to login" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter Password" />
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
                Login
              </Button>
            </Form.Item>
            <Link to={routes.SIGNUP}>Create an account ?</Link>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default Login;
