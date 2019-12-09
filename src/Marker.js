import React from 'react';
import './Marker.css';

function Marker(props) {

  function handleClick() {
    console.log('click marker');
  }

  return (
    <div className="Marker" onClick={handleClick}>
      {props.text}
    </div>
  );
}

export default Marker;