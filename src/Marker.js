import React from 'react';
import './Marker.css';

function Marker(props) {

  function handleClick() {
    if (!props.user) {
      props.displayDetails(props.restaurant);
    }
  }

  return (
    <div className="Marker" onClick={handleClick}>
      {props.text}
    </div>
  );
}

export default Marker;