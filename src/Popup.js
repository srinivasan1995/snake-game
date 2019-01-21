import React, { Component } from 'react';
import './Popup.css'

class Popup extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>{this.props.text}</h2>
        </div>
      </div>
    );
  }
}

export default  Popup;