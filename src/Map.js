import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import './Map.css';

const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;

class Map extends Component {
  constructor(props) {
    super(props);
    this.apiResolve = null;
    this.apiReject = null;
    this.apiLoadedPromise = new Promise((resolve, reject) => {
      this.apiResolve = resolve;
      this.apiReject = reject;
    })
  }

  handleApiLoaded = (map, maps) => {
    if(this.apiResolve != null) {
      this.apiResolve({map, maps});
    } else {
      this.apiLoadedPromise = Promise.resolve({map, maps});
    }
  } 

  render() {

    return (
      <div className="Map">
        { this.props.isLoading ?
          <p>Is loading...</p> :
          (<GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
              center={this.props.center}
              zoom={14}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={( {map, maps}) => this.handleApiLoaded(map, maps)}
          >
            {this.props.restaurants.map( (restaurant, index) => (
              <Marker
              key={index}
              lat={restaurant.position.lat}
              lng={restaurant.position.lng}
              text={restaurant.name}
              />)
              )
            }
            <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text="You're here"
            user={true}
            />
          </GoogleMapReact>)
        }
      </div>
    );
  }
}

export default Map;