import React, { Component } from 'react';
import { Form, Input } from 'antd';

import './CreateAccount.css';
import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { accountCreater } from '../../Services/AccountServices';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
        emsg: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = () => {
    if ( this.state.password === this.state.cpassword )
      accountCreater(this.state.name, this.state.email, this.state.password);
    else
      this.setState({emsg: "Passwords didn't match"})
  }
  render() {
    return (
      <div className="CreateAccount">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit}>

            <center><h2>Create Account</h2></center><br />

            <label for="name">Name</label><br />
            <Form.Item
              name="name"
              rules={[{required: true, min: 4, message: "Please enter a your name"}]}>
              <Input onChange={this.handleChange} />
            </Form.Item>

            <label for="email">Email</label><br />
            <Form.Item
              name="email"
              rules={[{required: true, min: 4, message: "Please enter a verified email"}]}>
              <Input onChange={this.handleChange} />
            </Form.Item>

            <label for="password">Password</label><br />
            <Form.Item
              name="password"
              rules={[{required: true, min: 4, message: "Enter a strong password"}]}>
              <Input.Password onChange={this.handleChange} />
            </Form.Item>

            <label for="cpassword">Confirm Password</label><br />
            <Form.Item
              name="cpassword"
              rules={[{required: true, min:4, message: "Re-enter your passoword to confirm"}]}>
              <Input.Password onChange={this.handleChange} />
            </Form.Item><br />

            <Form.Item>
              <center>
                <Button class="normal">Create Account</Button><br />
                <a href="/account/login/">Already have an account ?</a>
              </center>
            </Form.Item>

          </Form>
        </Portal>
      </div>
    );
  }
}

export default CreateAccount;
