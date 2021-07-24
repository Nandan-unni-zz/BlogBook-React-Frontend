import { Component } from "react";
import { Button, Form, Input, message, notification, Result, Row } from "antd";
import { connect } from "react-redux";
import FeatherIcon from "feather-icons-react";
import { Banner } from "../../components";
import {
  getUsernamesAndEmailsService,
  updateWriterService,
} from "../../../services/api/writer.api";
import { routes } from "../../router/routes";
import actions from "../../../store/auth/actions";

const { autoLogin } = actions;

class EmailSuccess extends Component {
  state = {
    usernames: [],
    loading: true,
    isAvailable: false,
  };

  handleLiveCheck = (_, val) => {
    if (val?.length < 4) {
      this.setState({ isAvailable: false });
      return Promise.reject(
        new Error("Username must atleast have 4 characters")
      );
    } else if (val?.length > 50) {
      this.setState({ isAvailable: false });
      return Promise.reject(new Error("Username cannot exceed 50 characters"));
    } else if (!RegExp("^([a-zA-Z0-9_]){4,50}$").test(val)) {
      this.setState({ isAvailable: false });
      return Promise.reject(
        new Error("Username can only have alpahbets, numbers or underscores")
      );
    } else if (this.state.usernames.some((item) => item.username === val)) {
      this.setState({ isAvailable: false });
      return Promise.reject(new Error("Username already taken"));
    } else {
      this.setState({ isAvailable: true });
      return Promise.resolve();
    }
  };

  handleSubmit = (values) => {
    updateWriterService(this.props.match.params.userId, values).then((res) => {
      if (res?.status === 200) {
        notification.info({ message: `Welcome, ${values?.username}` });
        this.props.history.push(routes.FEED);
      } else {
        console.log(res);
      }
    });
  };

  componentDidMount() {
    this.props.autoLogin(this.props.match.params.userId);
    getUsernamesAndEmailsService().then((res) => {
      if (res.status === 200) {
        this.setState({ usernames: res?.data, loading: false });
      } else {
        message.error("Live username checking not available !");
      }
    });
  }

  render() {
    return (
      <div>
        <Banner />
        <Result
          status="success"
          title="Email Confirmed & Account Activated"
          subTitle="Please select a unique username to continue"
          extra={
            <Row justify="center">
              <Form onFinish={this.handleSubmit}>
                <Form.Item
                  name="username"
                  tooltip="Username can have 4-50 characters containing alphabets, numbers and underscores"
                  rules={[{ validator: this.handleLiveCheck }]}
                >
                  <Input
                    size="large"
                    placeholder="Type your new username here..."
                    onChange={this.handleLiveCheck}
                    className="usernameInput"
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
                &nbsp; &nbsp; &nbsp;
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large">
                    Continue
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state: state.auth };
};

export default connect(mapStateToProps, { autoLogin })(EmailSuccess);
