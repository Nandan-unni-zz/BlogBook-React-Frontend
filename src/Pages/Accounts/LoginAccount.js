import React, { Component } from 'react';
import { Form, Input } from 'antd';

import './LoginAccount.css';
import Button from '../../Components/Button';
import Portal from '../../Components/Portal';
import Logo from '../../Components/Logo';
import { accountLogger } from '../../Services/AccountServices';

class LoginAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = () => {
    accountLogger(this.state.name, this.state.email, this.state.password);
  }
  render() {
    return (
      <div className="LoginAccount">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit}>

            <center><h2>Log In</h2></center><br />

            <label for="email">Email</label><br />
            <Form.Item
              name="email"
              rules={[{required: true, message: "Please enter a verified email"}]}>
              <Input onChange={this.handleChange} />
            </Form.Item>

            <label for="password">Password</label><br />
            <Form.Item
              name="password"
              rules={[{required: true, message: "Enter your passoword to login"}]}>
              <Input.Password onChange={this.handleChange} />
            </Form.Item><br />

            <Form.Item>
              <center>
                <Button class="normal">Log In</Button><br />
                <a href="/account/create/">Don't have an account ?</a>
              </center>
            </Form.Item>

          </Form>
        </Portal>
      </div>
    );
  }
}

export default LoginAccount;
