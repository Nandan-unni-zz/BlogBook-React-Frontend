import React, { Component } from 'react';
import { Form, Input } from 'antd';

import './EditAccount.css';
import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { accountEditor } from '../../Services/AccountServices';

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        bio: "",
        emsg: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = () => {
    accountEditor(this.state.name, this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="EditAccount">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit}>

            <center><h2>Edit Account</h2></center><br />

            <label for="name">Name</label><br />
            <Form.Item
              name="name"
              rules={[{required: true, min: 4, message: "Please enter a your name"}]}>
              <Input onChange={this.handleChange} />
            </Form.Item>

            <label for="bio">Bio</label><br />
            <Form.Item
              name="bio"
              rules={[{required: true, max: 100, message: "Word Limit reached"}]}>
              <Input.TextArea onChange={this.handleChange} className="bio" rows="5"/>
            </Form.Item><br />

            <Form.Item>
              <center>
                <Button class="normal">Save</Button><br />
                <a href="/account/view/">Change Profile Pic</a>
              </center>
            </Form.Item>

          </Form>
          <center><a href="/account/view/">Cancel</a></center>
        </Portal>
      </div>
    );
  }
}

export default EditAccount;
