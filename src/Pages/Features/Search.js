import React, { Component } from 'react';
import { Form } from 'antd';

import './Search.css';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import image from '../../Images/writer.png';
import { searchWriterAPI, getWritersAPI } from '../../Services/WriterServices';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      results: [],
      username: "",
      loaded: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value, errMsg: ""});
    console.log(this.state.username)
  }
  handleSubmit = async () => {
    const response = await searchWriterAPI({"username": this.state.username});
    if (response.status === 200)
      this.setState({ results: response.data, loaded: true })
    else
      this.setState({errMsg: "Invalid email or password."})
  }
  componentDidMount() {
    getWritersAPI().then(result => {
      this.setState({ results: result, loaded: true });
    });
  };
  render() {
    return (
      <div className="Search">
        <Navbar>
          <a href={`/writer/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z>Feed</z></a>
        </Navbar><br/><br/>
        <center>
          <div className="search-bar">
            <Form onFinish={this.handleSubmit}>
              <div className="search-box">
                <div className="search-in">
                  <Form.Item><input id="username" name="username" type="sear" placeholder="Search with pen name"  onChange={this.handleChange}  /> &nbsp;</Form.Item>
                </div>
                <div className="search-out">
                  <Form.Item><button type="submit"><i class="material-icons">search</i></button></Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </center><br/>
        <div className="search-results">

        {this.state.loaded ? <div> {
          this.state.results.map(result => 
          <div>
          <div className="search-result">
            <div className="result-img"><img src={image} alt="dp" /></div>
            <div className="result-names">
              <unm>{result.username}</unm><br/>
              <nm>{result.name}</nm>
            </div>
            <div className="result-ctrl"><Button class="normal-small">Follow</Button></div>
          </div><br/>
          <div className="result-divider"></div><br/></div>
          ) } </div>  : <p></p> }

        </div>
      </div>
    );
  }
}

export default Search;
