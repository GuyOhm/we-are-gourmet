import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './Filter';
import RestaurantsList from './RestaurantsList';
import Map from './Map';
import RestaurantData from './model/RestaurantData';
import RatingData from './model/RatingData';
import Details from './Details';

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
  const [ mapAPI, setMapAPI ] = useState(null);
  const [ openDetails, setOpenDetails ] = useState(false);
  const [ restaurantDetails, setRestaurantDetails ] = useState(null);
  const [ restaurantHover, setRestaurantHover ] = useState(null);
  
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

  const getPlacesRestaurants = (mapAPI) => {
    const { map, maps } = mapAPI;
    const service = new maps.places.PlacesService(map);
    // const user = new maps.LatLng(center.lat, center.lng);
    const request = {
      // location: user,
      // radius: RADIUS,
      type: PLACES_TYPE_SEARCH,
      bounds: map.getBounds()
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

  function handleGoogleApi(mapAPI) {
    if (mapAPI != null) setMapAPI(mapAPI);
  }

  function getPlaceDetails(restaurant) {
    // add boolean for places search
    if (!restaurant.hasGotDetails) {
      const { place_id } = restaurant;
      const { map, maps } = mapAPI;
      const request = {
        placeId: place_id,
      }
      const service = new maps.places.PlacesService(map);
      service.getDetails(request, (results, status) => {
        if (status === maps.places.PlacesServiceStatus.OK) {
          restaurant.hasGotDetails = true;
          addRestaurantData(restaurant, results);
        }
      });
    } else {
      displayRestaurantDetails(restaurant);
    }
  }

  function addRestaurantData(restaurant, results) {
    const { reviews } = results;
    reviews.map(review => restaurant.ratings.push(new RatingData(review)));
    updateRestaurantData(restaurant);
  }

  function updateRestaurantData(restaurant, displayDetails = true) {
    const index = restaurants.indexOf(restaurant);
    if (index >= 0) {
      const newRestaurants = restaurants;
      newRestaurants.splice(index, 1, restaurant);
      setRestaurants(newRestaurants);
    }
    if (displayDetails) displayRestaurantDetails(restaurant);
  }

  function displayRestaurantDetails(restaurant) {
    setRestaurantDetails(restaurant);
    setOpenDetails(true);
  }

  function onCloseDetails() {
    setOpenDetails(false);
  }

  function addReview(review) {
    const { rating } = review;
    const restaurant = restaurantDetails;
    restaurant.ratings.push(new RatingData(review));
    restaurant.updateAverageRatingData(rating);
    updateRestaurantData(restaurant, false);
    setRestaurantDetails(restaurant);
  }

  function hoverRestaurant(restaurant) {
    setRestaurantHover(restaurant);
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
    if (readyLocation && mapAPI != null) {
      getPlacesRestaurants(mapAPI);
    }
  }, [center, mapAPI]);

  useEffect( () => {
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
          <RestaurantsList
            restaurants={restaurantsFiltered}
            displayDetails={getPlaceDetails}
            hoverRestaurant={hoverRestaurant}
            restaurantHover={restaurantHover}
          />
        </section>
        <Map
          restaurants={restaurantsFiltered}
          handleGoogleApi={handleGoogleApi}
          center={center}
          isLoading={isLoading}
          displayDetails={getPlaceDetails}
          hoverRestaurant={hoverRestaurant}
          restaurantHover={restaurantHover}
        />
        <Details
          open={openDetails}
          onClose={onCloseDetails}
          restaurant={restaurantDetails}
          addReview={addReview} />
      </div>
    </div>
  );
}

export default App;