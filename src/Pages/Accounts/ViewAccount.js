import React, { Component } from 'react';

import './ViewAccount.css';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';

import { accountViewer } from '../../Services/AccountServices'

class ViewAccount extends Component {
  constructor (props) {
    super(props);
    this.state = {
      writer: {},
    }
  }
  componentDidMount() {
    console.log(this.props.match.params.username);
    accountViewer(this.props.match.params.username).then(result => {
      this.setState({ writer: result })
      console.log(this.state.writer);
    });
  }
  render() {
    const writer = this.state.writer;
    return (
      <div className="ViewAccount">
        <Navbar>
          <a href="/account/logout/"><i class="material-icons">power_settings_new</i><br/><z> Logout</z></a>
          <a href="/account/view/"><i class="material-icons">settings</i><br/><z> Settings</z></a>
          <a href="/feed/"><i class="material-icons">home</i><br/><z> Feeds</z></a>
        </Navbar>
        <div className="Profile">
          <div className="Prof-img">
            <center><img src={writer.dp} alt="DP" /></center>
          </div>
          <div className="Prof-dtl">
            <center>
              <nm>{writer.name}</nm><br />
              <unm>{writer.username} </unm>
              &nbsp; <b>|</b> &nbsp; <eml>{writer.email}</eml>

              <div className="Prof-math">
                <a href="?tab=published"><div className="math-dtl"><n>{writer.no_of_blogs}</n><br/><t>Blogs</t></div></a>
                <a href="?tab=following"><div className="math-dtl"><n>{writer.no_of_following}</n><br/><t>Following</t></div></a>
                <a href="?tab=followers"><div className="math-dtl"><n>{writer.no_of_followers}</n><br/><t>Followers</t></div></a>
              </div>

              <bio>{writer.bio}</bio><br/>
            </center><br/>
          </div>
          <div className="Prof-ctrl">
            <div className="ctrl-edit"><Button class="normal" href={`/account/edit/${writer.username}`}>Edit Account</Button></div>
            <div className="ctrl-delete"><Button class="danger" href={`/account/delete/${writer.username}`}>Delete Account</Button></div>
          </div>
        </div><br />
        <div className="Prof-divider"></div>
          <div className="Prof-Nav">
            <div className="Prof-Nav-item"><a href="?tab=following"><i class="material-icons">person</i><br/><z>Following</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=followers"><i class="material-icons">people</i><br/><z>Followers</z></a></div>
            <div className="Prof-Nav-item item-active"><a href="?tab=published"><i class="material-icons">library_books</i><br/><z>Published</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=saved"><i class="material-icons">archive</i><br/><z>Saved</z></a></div>
            <div className="Prof-Nav-item"><a href="?tab=bookmarked"><i class="material-icons">bookmark</i><br/><z>Bookmarked</z></a></div>
          </div>
          <div className="item-dtl">
          </div>
      </div>
    );
  }
}

export default ViewAccount;
