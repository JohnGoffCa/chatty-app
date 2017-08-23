import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import random from './random';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  //componentDidMount() {
  //  console.log("componentDidMount <App />");
  //  setTimeout(() => {
  //    console.log("Simulating incoming message");
  //    // Add a new message to the list of messages in the data store
  //    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //    const messages = this.state.messages.concat(newMessage)
  //    // Update the state of the app component.
  //    // Calling setState will trigger a call to render() in App and all child components.
  //    this.setState({messages: messages})
  //  }, 3000);
  //}

  recieveData = (contents) => {
    const message = {
      id: random(),
      username: contents.user || this.state.currUser || 'Anonymous',
      content: contents.content,
    };
    const messages = this.state.messages.concat(message);
    this.setState({
      user: contents.user,
      messages,
    });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currUser} callback={this.recieveData} />
      </div>
    );
  }
}
export default App;
