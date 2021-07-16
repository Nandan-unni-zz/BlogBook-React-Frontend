import "./index.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import Layout from "./Layout";
import { routes } from "../../router/routes";
import { icon } from "../../../static";
import actions from "../../../store/auth/actions";
import { getUsernamesAndEmailsService } from "../../../services/api/writer.api";

const { signup } = actions;

class Signup extends Component {
  state = {
    allowTrial: true,
    emails: [],
    loading: true,
    isAvailable: false,
  };

  handleLiveCheck = (_, val) => {
    if (val === "") {
      this.setState({ isAvailable: false });
      return Promise.reject(new Error("Please provide an email"));
    } else if (this.state.emails.some((item) => item.email === val)) {
      this.setState({ isAvailable: false });
      return Promise.reject(new Error("Email already in use"));
    } else {
      this.setState({ isAvailable: true });
      return Promise.resolve();
    }
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

  componentDidMount() {
    getUsernamesAndEmailsService().then((res) => {
      if (res.status === 200) {
        this.setState({ emails: res?.data, loading: false });
      } else {
        message.error("Live email checking not available !");
      }
    });
  }

  render() {
    return (
      <Layout className="Auth-right-signup">
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
                { validator: this.handleLiveCheck },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your email"
                onChange={this.handleLiveCheck}
                disabled={this.props.state.isSubmitting}
                addonAfter={
                  this.state.loading ? (
                    <FeatherIcon
                      icon="loader"
                      size={18}
                      className="portal-livecheck portal-livecheck-load"
                    />
                  ) : this.state.isAvailable ? (
                    <FeatherIcon
                      icon="check-circle"
                      size={18}
                      className="portal-livecheck portal-livecheck-tick"
                    />
                  ) : (
                    <FeatherIcon
                      icon="x-circle"
                      size={18}
                      className="portal-livecheck portal-livecheck-x"
                    />
                  )
                }
              />
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
                loading={this.props.state.isSubmitting}
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
  return { state: state.auth };
};

export default connect(mapStateToProps, { signup })(Signup);
