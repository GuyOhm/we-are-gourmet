import React from 'react';
import './Restaurant.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function Restaurant(props) {

  const handleClick = (event) => {
    console.log('click');
  }

  return (
    <div
      className="Restaurant-item"
      onClick={handleClick}>
      <div className="Restaurant-main">
        <div className="Restaurant-name">{props.restaurant.name}</div>
      </div>
      <div className="Restaurant-rating">
        <Box component="fieldset" mt={1} borderColor="transparent">
        <Rating name="read-only" value={props.restaurant.averageRating} precision={0.1} readOnly />
        </Box>
      </div>
    </div>
    );
}

export default Restaurant;