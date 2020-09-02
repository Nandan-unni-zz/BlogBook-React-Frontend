import React, { Component } from 'react';
import { Form } from 'antd';

import './Search.css';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import image from '../../Images/writer.png';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    }
  }
  render() {
    return (
      <div className="Search">
        <Navbar>
          <a href={`/account/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feed</z></a>
        </Navbar><br/><br/>
        <center>
          <div className="search-bar">
            <Form>
              <div className="search-box">
                <div className="search-in">
                  <Form.Item><input name="username" type="sear" placeholder="Search with pen name" /> &nbsp;</Form.Item>
                </div>
                <div className="search-out">
                  <Form.Item><button type="submit"><i class="material-icons">search</i></button></Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </center><br/>
        <div className="search-results">

          <div className="search-result">
            <div className="result-img"><img src={image} alt="dp" /></div>
            <div className="result-names">
              <unm>django</unm><br/>
              <nm>Django Software Foundation</nm>
            </div>
            <div className="result-ctrl"><Button class="normal-small">Follow</Button></div>
          </div><br/>
          <div className="result-divider"></div><br/>

        </div>
      </div>
    );
  }
}

export default Search;
