import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user || '',
      value: '',
    };
  }

  handleMessChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleUserChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.socket.send(JSON.stringify({
        user: this.state.username,
        content: this.state.value,
      }));
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder='Your Name (Optional)' value={this.state.username} onChange={this.handleUserChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.value} onChange={this.handleMessChange} onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
