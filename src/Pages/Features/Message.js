import React, { Component } from 'react';

import './Message.css';
import Navbar from '../../Components/Navbar';

class Message extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    }
  }
  render() {
    if (window.innerWidth > 600)
    return (
      <div className="Message">
        <div class="chat-menu">
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
          <a href="/message/">Django Software Foundation</a>
          <a href="/message/">React Software Foundation</a>
        </div>

        <div class="chat-box">
          <div className="chat-head">
            <Navbar>
              <a href={`/account/view/${this.state.user.username}`}><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
              <a href="/feed/"><i class="material-icons">home</i><br/><z>Feed</z></a>
              <center><a href="/message/"><h1>React Software Foundation</h1></a></center>
            </Navbar>
          </div>
          <div className="chat-msg">
          <div className="msg-rcv"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-snd"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-rcv"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-snd"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-rcv"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-snd"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-rcv"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-snd"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-rcv"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-snd"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-rcv"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          <div className="msg-snd"><p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, 
            maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, 
            id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. 
            Eum no molestiae voluptatibus.
          </p></div><br/>
          </div>
        </div>
      </div>
    );
    else
      return(
        <div className="Message">
          <Navbar>
            <a href="/account/view/"><i class="material-icons">account_circle</i><br/><z>Profile</z></a>
            <a href="/feed/"><i class="material-icons">home</i><br/><z>Feed</z></a>
          </Navbar><br/><br/><br/>
          <center><i class="material-icons" style={{color: "red"}}>warning</i><p style={{color: "tomato", fontSize: "1.8vh"}}>This feature is not compatible with this device. Use Desktop/Laptop for better experience</p></center>
        </div>
      );
  }
}

export default Message;
