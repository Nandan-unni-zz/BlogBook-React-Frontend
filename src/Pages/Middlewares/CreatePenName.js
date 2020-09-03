import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Redirect } from "react-router-dom";

import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { usernameCreator, accountViewer } from '../../Services/AccountServices';

class CreatePenName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      username: "",
      isSuccess: false,
      errMsg: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    accountViewer(this.props.match.params.username).then(res => {
      this.setState({user: res });
    });
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmit = async () => {
    const res = await usernameCreator(this.state.user.pk, {'username': this.state.username});
    console.log(res.status)
    if (res.status === 200)
      this.setState({isSuccess: true});
    else
      this.setState({errMsg: 'Pen Name already taken'})
  }
  render() {
    return (
      <div className="CreatePenName">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit}>

            <center><h2>Pen Name</h2></center><br />

            <label for="username">Choose a unique Pen Name (min 4)</label><br />
            <Form.Item
              name="username"
              rules={[{required: true, message: "Alphabets, numbers and underscores only", pattern: new RegExp("^([a-zA-Z0-9_]){4,50}$")}]}>
              <Input onChange={this.handleChange} />
            </Form.Item>
            <center>{ !this.state.isSuccess ? <err>{this.state.errMsg}</err> : <Redirect to="/account/login/" />}</center>
            <br />
            <Form.Item>
              <center>
                <Button class="normal">Save & Continue</Button><br />
              </center>
            </Form.Item>

          </Form>
        </Portal>
      </div>
    );
  }
}

export default CreatePenName;
