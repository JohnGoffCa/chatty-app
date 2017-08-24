import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //username: this.props.username || '',
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
      if (e.target.className === 'chatbar-message') {
        this.props.updateMessages({
          username: this.props.username,
          value: this.state.value,
        });
      } else if (e.target.className === 'chatbar-username') {
        this.props.userCallback(e.target.value);
      }
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder='Your Name (Optional)' onChange={this.handleUserChange} onKeyPress={this.handleKeyPress} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.value} onChange={this.handleMessChange} onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
