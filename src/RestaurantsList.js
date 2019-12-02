import React, { Component } from 'react';
import Restaurant from './Restaurant';
import './RestaurantsList.css';

class RestaurantsList extends Component {
    render() {
      return (
        <div className="Restaurants-list">
          {this.props.restaurants.map( (restaurant, index) => {
            return <Restaurant key={index} restaurant={restaurant} />
          })}
        </div>
      );
    }
}

export default RestaurantsList;