import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { createWriterAPI } from '../../Services/WriterServices';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
        isSuccess: false,
        isMailed: true,
        errMsg: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = async () => {
    let res;
    this.setState({errMsg: "Please wait..."})
    if ( this.state.password === this.state.cpassword )
    {
      this.setState({errMsg: "Sending verification mail..."})
      res = await createWriterAPI({'name': this.state.name, 'email': this.state.email, 'username': this.state.email, 'password': this.state.password});
      console.log(res.status)
      if (res.status === 201)
        this.setState({isSuccess: true});
      if (res.status === 204)
        this.setState({errMsg: "Email sending failed. Server Error", isMailed: false});
      else
        this.setState({errMsg: "Email already in use."})
    }
    else
      this.setState({errMsg: "Passwords didn't match"});
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
              rules={[{required: true, type: "email", min: 4, message: "Please enter a verified email"}]}>
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
            </Form.Item>
            <center>{ !this.state.isSuccess ? <err>{this.state.errMsg}</err> : <Redirect to="/success/" />}</center>
            <p>{ !this.state.isMailed ? <Redirect to="/login/" /> : <></> }</p>
            <br />

            <Form.Item>
              <center>
                <Button class="normal">Create Account</Button><br />
                <a href="/login/">Already have an account ?</a>
              </center>
            </Form.Item>

          </Form>
        </Portal>
      </div>
    );
  }
}

export default CreateAccount;