import React from 'react';
import './Marker.css';

function Marker(props) {

  function handleClick() {
    if (!props.user) {
      props.displayDetails(props.restaurant);
    }
  }

  const iconUrl = props.user ? "/user-marker.png" : "/restaurant-marker.png";

  return (
    <div
      style={{backgroundImage: `url(${iconUrl})`, width: "40px", height: "40px", backgroundSize: "contain"}}
      onClick={handleClick}>
      {/* {props.text} */}
    </div>
  );
}

export default Marker;