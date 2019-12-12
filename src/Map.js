import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import './Map.css';

const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;

function Map(props) {

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map != null) {
      props.handleGoogleApi(map);
    }
  }, [map])

  return (
    <div className="Map">
      { props.isLoading ?
        <p>Is loading...</p> :
        (<GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
            center={props.center}
            zoom={14}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({map, maps}) => setMap({map: map, maps: maps})}
        >
          {props.restaurants.map( (restaurant, index) => (
            <Marker
              key={index}
              lat={restaurant.position.lat}
              lng={restaurant.position.lng}
              text={restaurant.name}
              restaurant={restaurant}
              displayDetails={props.displayDetails}
              user={false}
            />)
            )
          }
          <Marker
            lat={props.center.lat}
            lng={props.center.lng}
            text="You're here"
            user={true}
            displayDetails={props.displayDetails}
          />
        </GoogleMapReact>)
      }
    </div>
  );
}

export default Map;