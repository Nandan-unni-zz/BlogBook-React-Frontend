import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <br/><center>
              <a href="https://github.com/nandan-unni"><i class="fa fa-lg fa-github"></i></a> &nbsp;
              <a href="https://twitter.com/nandanunni"><i class="fa fa-lg fa-twitter"></i></a> &nbsp;
              <a href="http://www.linkedin.com/in/nandanunni-a-s-258b10193"><i class="fa fa-lg fa-linkedin"></i></a> &nbsp;
              <a href="https://www.instagram.com/u.n.n.i._/"><i class="fa fa-lg fa-instagram"></i></a> &nbsp;
              <b> |</b> &nbsp; 
              A S NANDANUNNI &nbsp; <b>|</b> &nbsp; &copy; 2020 &nbsp;
          </center><br/>
      </div>
    );
  }
}

export default Footer;
