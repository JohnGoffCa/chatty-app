import React, {Component} from 'react';

const URI = require('urijs');

class Message extends Component {
  render() {
    let renderMessage = '';
    if (this.props.message.type === 'incomingMessage') {
      const imgs = [];
      const parsed = URI.withinString(this.props.message.content,(url) => {
        if (URI(url).suffix() === 'jpg' || URI(url).suffix() === 'png' || URI(url).suffix() === 'gif') {
          imgs.push(url);
          return '';
        }
      });
      if (imgs.length === 0) {
        renderMessage = (
          <div className="message">
            <span className="message-username" style={{color: `#${this.props.message.color}`}}>{this.props.message.username || 'Anonymous'}</span>
            <span className="message-content">{parsed}</span>
          </div>
        );
      } else {
        const arr = imgs.map((href, idx) => <img src={href} key={idx} />);
        renderMessage = (
          <div className="message">
            <span className="message-username" style={{color: `#${this.props.message.color}`}}>{this.props.message.username || 'Anonymous'}</span>
            <span className="message-content">{parsed}{arr}</span>
          </div>
        );
      }
    } else if (this.props.message.type === 'incomingNotification') {
      renderMessage = (
        <div className="message system" style={{color: `#${this.props.message.color}`}}>
          {this.props.message.content}
        </div>
      );
    }
    return renderMessage;
  }
}
export default Message;
