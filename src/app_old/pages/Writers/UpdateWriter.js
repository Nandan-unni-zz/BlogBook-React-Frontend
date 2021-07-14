import React, { Component } from "react";
import { Form, Input } from "antd";
import { Redirect, Link } from "react-router-dom";

import { Button, Logo, Portal, Navbar } from "../../components";
import { updateWriterAPI } from "../../../services/writer";
import { routes } from "../../router/routes";

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      name: "",
      bio: "",
      errMsg: "",
      isSuccess: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = async () => {
    const response = await updateWriterAPI(this.state.user.username, {
      name: this.state.name,
      bio: this.state.bio,
    });
    if (response.status === 200) {
      this.setState({ isSuccess: true });
      localStorage.setItem("user", JSON.stringify(response.data));
    } else this.setState({ errMsg: "Invalid email or password." });
  };
  formRef = React.createRef();
  componentDidMount() {
    this.setState({ name: this.state.user.name, bio: this.state.user.bio });
    this.formRef.current.setFieldsValue({
      name: this.state.user.name,
      bio: this.state.user.bio,
    });
  }
  render() {
    const user = this.state.user;
    return (
      <div className="EditAccount">
        <Logo />
        <Navbar />
        <br />
        <br />
        <br />
        <Portal>
          <Form onFinish={this.handleSubmit} ref={this.formRef}>
            <center>
              <h2>Edit Account</h2>
            </center>
            <br />

            <label for="name">Name</label>
            <br />
            <Form.Item
              name="name"
              initialValue={`${this.state.user.name}`}
              rules={[
                { required: true, min: 4, message: "Please enter a your name" },
              ]}
            >
              <Input onChange={this.handleChange} />
            </Form.Item>

            <label for="bio">Bio</label>
            <br />
            <Form.Item
              name="bio"
              rules={[
                { required: true, max: 100, message: "Word Limit reached" },
              ]}
            >
              <Input.TextArea
                onChange={this.handleChange}
                className="bio"
                rows="5"
              />
            </Form.Item>

            <center>
              {!this.state.isSuccess ? (
                <err>{this.state.errMsg}</err>
              ) : (
                <Redirect to={`/writer/view/${user.username}`} />
              )}
            </center>
            <br />

            <Form.Item>
              <center>
                <Button className="normal">Save</Button>
                <br />
                <Link to={routes.PROFILE(user.username)}>
                  Change Profile Pic
                </Link>
              </center>
            </Form.Item>
          </Form>
          <center>
            <Link to={routes.PROFILE(user.username)}>Cancel</Link>
          </center>
        </Portal>
      </div>
    );
  }
}

export default EditAccount;
