import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log(this.props.messages)
    const messages = this.props.messages.map((message) => 
      <Message message={message} key={message.id} />
    );
    return (
      <main className="messages">{messages}</main>
    );
  }
}
export default MessageList;
