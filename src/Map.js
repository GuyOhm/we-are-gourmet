import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import './Map.css';

const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;

function Map(props) {

  const [mapAPI, setMapAPI] = useState(null);

  function handleClick(event) {
    const { lat, lng } = event; 
    props.addRestaurant({lat, lng});
  }

  useEffect(() => {
    if (mapAPI != null) {
      props.handleGoogleApi(mapAPI);
      const { map } = mapAPI;
      map.addListener('idle', () => props.cleanAndReload(mapAPI));
    }
  }, [mapAPI])

  return (
    <div className="Map">
      { props.isLoading ?
        <p>Is loading...</p> :
        (<GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
            center={props.center}
            zoom={14}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({map, maps}) => setMapAPI({map: map, maps: maps})}
            onClick={handleClick}
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
              hoverRestaurant={props.hoverRestaurant}
              restaurantHover={props.restaurantHover}
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