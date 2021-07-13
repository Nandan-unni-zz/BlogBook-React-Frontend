import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import { routes } from "../../router/routes";
import { icon } from "../../../static";
import actions from "../../../store/actions";

const { signup } = actions;

class Signup extends Component {
  state = {
    allowTrial: true,
  };

  handleSignup = (values) => {
    this.props.signup(
      values.name,
      values.email,
      values.password,
      values.cpassword,
      this.props.history
    );
  };

  render() {
    return (
      <Layout>
        {this.state.allowTrial && (
          <div className="portal-notif">
            <span>Trial Login available at Login Portal</span>
          </div>
        )}
        <div className="portal portal-signup">
          <h2 className="portal-head">
            <img src={icon} alt="icon" />
            Signup
          </h2>
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
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="portal-submit"
                loading={false}
              >
                Signup
              </Button>
            </Form.Item>
            <Link to={routes.LOGIN} className="portal-link">
              Already have an account ?
            </Link>
          </Form>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, { signup })(Signup);
