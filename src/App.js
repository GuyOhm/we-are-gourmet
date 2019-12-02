import React, { Component } from 'react';
import './App.css';
import Filter from './Filter';
import RestaurantsList from './RestaurantsList';
import Map from './Map';
import RestaurantData from './model/RestaurantData'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      isLoading: false,
      center: {
        lat: 48.864716,
        lng: 2.349014,
      }
    }
    this.map = React.createRef();
  }

  getRestaurants = async () => {
    const response = await fetch('/restaurants.json');
    const responseJson = await response.json();
    const restaurants = [];
    responseJson.forEach( json => {
      const restaurant = new RestaurantData(json);
      restaurants.push(restaurant);
    });
    return restaurants;
  }

  getUserPosition = () => {
    return new Promise( (resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            resolve(position);
        }, () => reject(new Error('no position')));
      } else {
        reject(new Error('no geolocation'));
      }
    });
  }

  getPlacesRestaurants = (map, maps) => {
    const { center } = this.state;
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
        results.forEach(result => {
          const newRestaurant = new RestaurantData(result);
          restaurants.push(newRestaurant);
        })
      }
      this.setState({restaurants});
    });
  }

  async componentDidMount() {
    // Load user position and update center
    this.setState({ isLoading: true });
    try {
      const position = await this.getUserPosition();
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setState({center, isLoading: false});
    }
    catch (error) {
      console.log(error);
    }
    // Get objects map and maps from Google Maps API through Map component
    const {map, maps} = await this.map.current.apiLoadedPromise;
    this.getPlacesRestaurants(map, maps);
  }

  render() {
    const { restaurants, center, isLoading } = this.state;

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
            ref={this.map}
            center={center}
            isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default App;
