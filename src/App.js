import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './Filter';
import RestaurantsList from './RestaurantsList';
import Map from './Map';
import RestaurantData from './model/RestaurantData'

function App() {
  
  const [ restaurants, setRestaurants ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ center, setCenter ] = useState({
    lat: 48.864716,
    lng: 2.349014
  });
  const [ filter, setFilter ] = useState({
    min: 0,
    max: 5
  });
  const [ readyLocation, setReadyLocation ] = useState(false);
  const mapRef = React.createRef();
  
  const getUserPosition = () => {
    return new Promise( (resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            resolve(position);
        }, () => {
          reject(new Error('no position'))
        });
      } else {
        reject(new Error('no geolocation'));
      }
    });
  }

  const getPlacesRestaurants = (map, maps) => {
    const service = new maps.places.PlacesService(map);
    const user = new maps.LatLng(center.lat, center.lng);
    const request = {
      location: user,
      radius: '1000',
      type: ['restaurant'],
    }
    
    const restaurants = [];

    service.nearbySearch(request, (results, status) => {
      if (status === maps.places.PlacesServiceStatus.OK) {
        console.log('getRestaurants', center)
        results.forEach(result => {
          const newRestaurant = new RestaurantData(result);
          restaurants.push(newRestaurant);
        })
      }
      setRestaurants(restaurants);
    });
  }

  useEffect( () => {
    // Load user position and update center
    setIsLoading(true);
    async function setUserPosition() {
      try {
        const position = await getUserPosition();
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setReadyLocation(true);
        setCenter(center);
        setIsLoading(false);
      }
      catch (error) {
        console.log(error);
        setReadyLocation(true);
        setCenter(center);
      }
    }
    setUserPosition();
    console.log('useEffect... center')
  }, []);

  useEffect( () => {
    // Get objects map and maps from Google Maps API through Map component
    console.log('useEffect... restaurants', center)
    async function getRestaurants() {
      const {map, maps} = await mapRef.current.apiLoadedPromise;
      getPlacesRestaurants(map, maps);
    }
    if(readyLocation) getRestaurants();
  }, [center]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          WE ARE GOURMET
        </p>
      </header>
      <div className="App-body">
        <section className="Main">
          <Filter />
          <RestaurantsList restaurants={restaurants} />
        </section>
        <Map
          restaurants={restaurants}
          ref={mapRef}
          center={center}
          isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
