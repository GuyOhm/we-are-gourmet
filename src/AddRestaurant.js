import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, Divider, TextField, Button, DialogActions } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Rating from '@material-ui/lab/Rating';
import RestaurantData from './model/RestaurantData';
// import './AddRestaurant.css';

function AddRestaurant(props) {

  const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
  const [ name, setName ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ position, setPosition ] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleClose = () => {
    cleanFields();
    setIsAdding(false);
    props.onClose();
  };
  
  function handleChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    name === "name" ? setName(value) : setAddress(value);
  }

  function handleClick() {
    setIsAdding(true);
    if (name !== '' && address !== '') {
      const restaurant = new RestaurantData();
      restaurant.name = name;
      restaurant.address = address;
      restaurant.position = position;
      restaurant.averageRating = 0;
      restaurant.nbOfVotes = 0;
      restaurant.hasGotDetails = false;
      props.saveRestaurant(restaurant);
      setIsAdding(false);
      cleanFields();
      props.onClose();
    }
  }

  function cleanFields() {
    setName('');
    setAddress('');
  }

  async function getAdressFromPosition() {
    const { lat, lng } = position;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0 ) {
      const {formatted_address} = data.results[0];
      return formatted_address;
    }
  }

  useEffect(() => {
    if (props.position !== null) {
      setPosition(props.position);
    }
  }, [props.position])

  useEffect(() => {
    if (position !== null) {
      setAddressFromPosition();
    }
    async function setAddressFromPosition() {
      const address = await getAdressFromPosition(position);
      setAddress(address);
    }
  }, [position])

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="simple-dialog-title" >
      <DialogTitle id="simple-dialog-title">Add a new restaurant</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          margin="dense"
          type="text"
          label="Name of the restaurant"
          value={name}
          onChange={handleChange}
          helperText={(isAdding && name === '') && "Please enter a name"}
          fullWidth
          required
          error={isAdding && name === ''}
        />
        <TextField
          name="address"
          margin="dense"
          type="text"
          label="Address of the restaurant"
          value={address}
          onChange={handleChange}
          helperText={(isAdding && address === '') && "please enter an address"}
          fullWidth
          required
          error={isAdding && address === ''}
        />
      </DialogContent>
      <DialogActions >
        <Button onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleClick}>
          Add Restaurant
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddRestaurant;