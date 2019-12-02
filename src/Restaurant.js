import React, { Component } from 'react';
import './Restaurant.css';

class Restaurant extends Component {

  handleClick = (event) => {
    console.log('click');
  }

  render() {
    const { restaurant } = this.props;
    return (
      <div
        className="Restaurant-item"
        onClick={this.handleClick}>
        <div className="Restaurant-name">{restaurant.name}</div>
        <div className="Restaurant-address">{restaurant.address}</div>
      </div>
    );
  }
}

export default Restaurant;