import React, { Component } from 'react';
import './Marker.css';

class Marker extends Component {

  handleClick = () => {
    console.log(this)
  }

  render() {
    let classes = 'Marker';
    // this.props.user ? classes = 'Marker User' : classes = 'Marker';
    return (
      <div className={classes} onClick={this.handleClick}>
        {this.props.text}
      </div>
    );
  }
}

export default Marker;