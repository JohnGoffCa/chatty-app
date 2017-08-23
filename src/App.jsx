import React, {Component} from 'react';
//import WebSocket from 'ws';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: {},
      currUser: '',
      messages: [{
      id: random(),
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: random(),
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }],
    };
  }
  componentDidMount() {
    const websoc = new WebSocket('ws://localhost:3001');
    websoc.onopen = () => {
      this.setState({ socket: websoc });
    };
  }

  //recieveData = (contents) => {
  //  const message = {
  //    id: random(),
  //    username: contents.user || this.state.currUser || 'Anonymous',
  //    content: contents.content,
  //  };
  //  const messages = this.state.messages.concat(message);
  //  this.setState({
  //    user: contents.user,
  //    messages,
  //  });
  //}

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currUser} socket={this.state.socket} />
      </div>
    );
  }
}
export default App;
