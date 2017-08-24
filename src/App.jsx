import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numUsers: 0,
      currUser: '',
      messages: [],
    };
  }
  componentDidMount() {
    const websoc = new WebSocket('ws://localhost:3001');
    websoc.onopen = () => {
      websoc.onmessage = this.recieveData;
      this.socket = websoc;
    };
  }

  recieveData = (data) => {
    const newMessage = JSON.parse(data.data);
    if (newMessage.type === 'incomingNewUser') {
      this.setState({ numUsers: newMessage.userNum });
    } else {
      const messages = this.state.messages.concat(newMessage);
      this.setState({
        messages,
      });
    }
  }

  updateUser = (username) => {
    if (username !== this.state.currUser) {
      this.socket.send(JSON.stringify({
        type: 'postNotification',
        content: `**${this.state.currUser || 'Anonymous'}* changed their name to *${username}**`,
      }));
      this.setState({ currUser: username });
    }
  }

  sendMessage = (message) => {
    this.socket.send(JSON.stringify({
      type: 'postMessage',
      username: message.username,
      content: message.value,
    }));
  }  

  render() {
    return (
      <div>
        <Navbar userNum={this.state.numUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currUser} userCallback={this.updateUser} updateMessages={this.sendMessage} />
      </div>
    );
  }
}
export default App;
