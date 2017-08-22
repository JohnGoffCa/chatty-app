import React, {Component} from 'react';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <MessageList><Message username={"maggie"} message={"test"} /></MessageList>
        <ChatBar />
      </div>
    );
  }
}
export default App;
