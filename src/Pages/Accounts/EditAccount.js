import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { accountEditor } from '../../Services/AccountServices';

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
        name: "",
        bio: "",
        errMsg: "",
        isSuccess: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = async () => {
    const response = await accountEditor(this.state.user.username, {"name": this.state.name, "bio": this.state.bio});
    if (response.status === 200)
    {
      this.setState({isSuccess: true});
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    else
      this.setState({errMsg: "Invalid email or password."})
  }
  formRef = React.createRef();
  componentDidMount () {
    this.setState({name: this.state.user.name, bio: this.state.user.bio})
    this.formRef.current.setFieldsValue({
      name: this.state.user.name,
      bio: this.state.user.bio
    });
  }
  render() {
    const user = this.state.user;
    return (
      <div className="EditAccount">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit} ref={this.formRef}>

            <center><h2>Edit Account</h2></center><br />

            <label for="name">Name</label><br />
            <Form.Item
              name="name"
              initialValue = {`${this.state.user.name}`}
              rules={[{required: true, min: 4, message: "Please enter a your name"}]}>
              <Input onChange={this.handleChange}  />
            </Form.Item>

            <label for="bio">Bio</label><br />
            <Form.Item
              name="bio"
              rules={[{required: true, max: 100, message: "Word Limit reached"}]}>
              <Input.TextArea onChange={this.handleChange} className="bio" rows="5"/>
            </Form.Item>

            <center>{!this.state.isSuccess ? <err>{this.state.errMsg}</err> : <Redirect to={`/account/view/${user.username}`} />}</center>
            <br />

            <Form.Item>
              <center>
                <Button class="normal">Save</Button><br />
                <a href="/account/view/">Change Profile Pic</a>
              </center>
            </Form.Item>

          </Form>
          <center><a href={`/account/view/${user.username}`}>Cancel</a></center>
        </Portal>
      </div>
    );
  }
}

export default EditAccount;
