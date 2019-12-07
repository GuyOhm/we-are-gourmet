import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './Filter';
import RestaurantsList from './RestaurantsList';
import Map from './Map';
import RestaurantData from './model/RestaurantData'

const RADIUS = '1000';
const PLACES_TYPE_SEARCH = ['restaurant'];
const PARIS_LATLNG = {
  lat: 48.864716,
  lng: 2.349014
};

function App() {
  
  const [ restaurants, setRestaurants ] = useState([]);
  const [ restaurantsFiltered, setRestaurantsFiltered ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ center, setCenter ] = useState(PARIS_LATLNG);
  const [ filter, setFilter ] = useState(null);
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
      radius: RADIUS,
      type: PLACES_TYPE_SEARCH,
    }
    
    const restaurants = [];

    service.nearbySearch(request, (results, status) => {
      if (status === maps.places.PlacesServiceStatus.OK) {
        results.forEach(result => {
          const newRestaurant = new RestaurantData(result);
          restaurants.push(newRestaurant);
        })
      }
      setRestaurants(restaurants);
    });
  }

  function onFilterChange(range) {
    setFilter(range);
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
  }, []);

  useEffect( () => {
    // Get objects map and maps from Google Maps API through Map component
    async function getRestaurants() {
      const {map, maps} = await mapRef.current.apiLoadedPromise;
      getPlacesRestaurants(map, maps);
    }
    if(readyLocation) getRestaurants();
  }, [center]);

  useEffect(() => {
    if (readyLocation) {
      let restaurantsFiltered = [];
      restaurantsFiltered = restaurants.filter(restaurant => {
        return (
          filter.to >= filter.from ?
          restaurant.averageRating >= filter.from && restaurant.averageRating <= filter.to :
          restaurant.averageRating <= filter.from && restaurant.averageRating >= filter.to
        );
      })
      setRestaurantsFiltered(restaurantsFiltered);
    }
  }, [restaurants, filter])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          WE ARE GOURMET
        </p>
      </header>
      <div className="App-body">
        <section className="Main">
          <Filter onFilterChange={onFilterChange} />
          <RestaurantsList restaurants={restaurantsFiltered} />
        </section>
        <Map
          restaurants={restaurantsFiltered}
          ref={mapRef}
          center={center}
          isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
