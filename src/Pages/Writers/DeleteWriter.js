import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { deleteWriterAPI } from '../../Services/WriterServices';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
        password: "",
        isSuccess: false,
        errMsg: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = async () => {
    const response = await deleteWriterAPI(this.state.user.username, {"password": this.state.password,});
    console.log(response.status)
    if (response.status === 204)
    {
      this.setState({errMsg: ""})
      localStorage.removeItem('user');
      this.setState({isSuccess: true});
    }
    else
      this.setState({errMsg: "Wrong password."})
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
                <a href={`/writer/view/${this.state.user.username}`}>Cancel</a>
              </center>
            </Form.Item>

          </Form>
        </Portal>
      </div>
    );
  }
}

export default DeleteAccount;
