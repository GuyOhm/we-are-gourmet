import React, {useState} from 'react';
import './Restaurant.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function Restaurant(props) {
  const [ hover, setHover ] = useState(false);

  const handleClick = (event) => {
    props.displayDetails(props.restaurant);
  }

  function toggleHover() {
    setHover(prevState => {
      const newState = !prevState;
      if(newState) {
        props.hoverRestaurant(props.restaurant);
      }
      return newState;
    });
  }

  return (
    <div
      className={props.restaurant === props.restaurantHover ? "Restaurant-item Hovered" : "Restaurant-item"}
      onClick={handleClick}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      >
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