import React from 'react';
import Restaurant from './Restaurant';
import './RestaurantsList.css';

function RestaurantsList(props) {
  return (
    <div className="Restaurants-list">
      {props.restaurants.map( (restaurant, index) => {
        return <Restaurant key={index} restaurant={restaurant} displayDetails={props.displayDetails}/>
      })}
    </div>
  );
}

export default RestaurantsList;