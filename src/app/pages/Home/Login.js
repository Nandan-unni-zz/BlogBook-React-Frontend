import "./index.css";

import { Component } from "react";
import { Form, Input, Button, Tag } from "antd";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import { routes } from "../../router/routes";
import { icon } from "../../../static";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTrial: true,
    };
  }
  render() {
    return (
      <Layout>
        <div className="portal-login">
          {this.state.allowTrial && (
            <div className="portal-notif">
              <h3>Trial Use</h3>
              <ul>
                <li>
                  <span>Email </span>: &nbsp; <span>trial@trial.com</span>
                </li>
                <li>
                  <span>Password </span>: &nbsp; <span>trial123</span>
                </li>
              </ul>
            </div>
          )}
          <div className="portal">
            <h2 className="portal-head">
              <img src={icon} alt="icon" />
              Login
            </h2>
            <Form onFinish={this.handleLogin} layout="vertical">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Enter your email to login" },
                  { type: "email", message: "Enter a valid email" },
                ]}
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
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="portal-submit"
                  loading={false}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Link to={routes.SIGNUP} className="portal-link">
              Create an account ?
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
