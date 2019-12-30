import React, {useState} from 'react';
import './Marker.css';

function Marker(props) {
  const [ hover, setHover ] = useState(false);
  
  const iconUrl = props.user ? "/user-marker.png" : (
    props.restaurant === props.restaurantHover ? "/restaurant-hover.png" : "/restaurant-marker.png"
  );

  function toggleHover() {
    if (!props.user) {
      setHover(prevState => {
        const newState = !prevState;
        if (newState) {
          props.hoverRestaurant(props.restaurant);
        }
        return newState;
      });
    }
  }
  
  function handleClick() {
    if (!props.user) {
      props.displayDetails(props.restaurant);
    }
  }

  return (
    <div
      style={{backgroundImage: `url(${iconUrl})`, width: "40px", height: "40px", backgroundSize: "contain"}}
      onClick={handleClick}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      >
      {/* {props.text} */}
    </div>
  );
}

export default Marker;