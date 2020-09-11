import React, { Component } from 'react';
import { Form } from 'antd';

import Logo from '../../Components/Logo';
import Portal from '../../Components/Portal';
import Button from '../../Components/Button';
import { blogDeleter } from '../../Services/BlogServices';

class DeleteBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = () => {
    blogDeleter(this.state.password);
  }
  render() {
    return (
      <div className="DeleteAccount">
        <Logo></Logo><br /><br /><br />
        <Portal>
          <Form onFinish={this.handleSubmit}>
            <center><h2>Delete Blog</h2></center><br />
            <p>Are you sure you want to delete the blog '<l>Django: The Python Framework</l>' ?</p><br/>
            <Form.Item>
              <center>
                <Button class="danger">Delete Blog</Button><br />
                <a href="/account/view/">Cancel</a>
              </center>
            </Form.Item>
          </Form>
        </Portal>
      </div>
    );
  }
}

export default DeleteBlog;
