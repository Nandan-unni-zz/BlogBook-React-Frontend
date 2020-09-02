import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import './DeleteAccount.css';
import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { accountDeleter } from '../../Services/AccountServices';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
        password: "",
        isSuccess: false,
        emsg: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = () => {
    accountDeleter(this.state.user.username, {"password": this.state.password,});
    localStorage.removeItem('user')
    this.setState({isSuccess: true})
  }
  render() {
    return (
      <div className="DeleteAccount">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit}>

            <center><h2>Delete Account</h2></center><br />
            <label for="password">Enter Password</label><br />
            <Form.Item
              name="password"
              rules={[{required: true, message: "Enter your passoword to confirm delete"}]}>
              <Input.Password onChange={this.handleChange} />
            </Form.Item>
            <center>{!this.state.isSuccess ? <err>{this.state.errMsg}</err> : <Redirect to="/" />}</center>
            <br />

            <Form.Item>
              <center>
                <Button class="danger">Delete Account</Button><br />
                <a href="/account/view/">Cancel</a>
              </center>
            </Form.Item>

          </Form>
        </Portal>
      </div>
    );
  }
}

export default DeleteAccount;
