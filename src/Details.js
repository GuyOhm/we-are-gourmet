import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, Divider, TextField, Button, DialogActions } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Rating from '@material-ui/lab/Rating';
import SimpleSnackbar from './SimpleSnackbar';
import './Details.css';

function Details(props) {

  const API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
  const { onClose, open, restaurant } = props;
  const [ value, setValue ] = useState(0);
  const [ comment, setComment ] = useState('');
  const [ fullname, setFullname ] = useState('');
  const [ snackbarOpen, setSnackbarOpen ] = useState(false);
  const [ isAddingComment, setIsAddingComment ] = useState(false);
  
  const handleClose = () => {
    cleanFields();
    setIsAddingComment(false);
    onClose();
  };
  
  function handleChangeValue(event, newValue) {
    setValue(newValue);
  }

  function handleChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    name === "fullname" ? setFullname(value) : setComment(value)
  }

  function handleClick() {
    setIsAddingComment(true);
    if (value !== 0 && comment !== '') {
      props.addReview({
        author_name: fullname === '' ? 'anonymous' : fullname,
        rating: value,
        text: comment,
      });
      cleanFields();
      setIsAddingComment(false);
    } else {
      if (value === 0) {
        setSnackbarOpen(true);
      }
    }
  }

  function cleanFields() {
    setValue(0);
    setComment('');
    setFullname('');
  }

  function closeSnackbar() {
    setSnackbarOpen(false);
  }

  if (restaurant === null) {
    return <div></div>
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title" >
        <DialogTitle id="simple-dialog-title">{restaurant.name}</DialogTitle>
        {/* Picture from streetview */}
        <DialogContent>
          <img src={`https://maps.googleapis.com/maps/api/streetview?size=600x200&location=${restaurant.address}
          &fov=80&heading=70&pitch=0
          &key=${API_KEY}`} alt="streetview" />
          <Rating
            value={restaurant.averageRating}
            name="averageRating"
            precision={0.1}
            readOnly
          />
          <DialogContentText>
            Number of votes: {restaurant.nbOfVotes}
          </DialogContentText>
          <DialogContentText>
            Address: {restaurant.address}
          </DialogContentText>
          {/* List of comments for this restaurant */}
          {restaurant.ratings.map((rating, index) => {
            return (
              <div key={index} >
                <DialogContent key={index} style={{paddingLeft: "0"}}className="Comment-info"  >
                  <DialogContentText className="Comment-name" style={{fontWeight: "bold"}}>{rating.name}</DialogContentText>
                  <Rating value={rating.rating} className="Comment-rating" name="rating" precision={0.1} disabled />
                </DialogContent>
                <DialogContentText >{rating.comment}</DialogContentText>
                <Divider />
              </div>
            )
          })}
          {/* Add comment box */}
          <DialogContentText style={{marginTop: "10px", fontWeight: "bold"}}>
            Please add your rating and your comment
          </DialogContentText>
          <Rating
            name="newRating"
            value={value}
            onChange={handleChangeValue}
          />
          <TextField
            name="fullname"
            margin="dense"
            type="text"
            label="your name"
            value={fullname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="comment"
            margin="dense"
            type="text"
            label="your comment"
            value={comment}
            onChange={handleChange}
            fullWidth
            required
            helperText={ isAddingComment && comment === "" ? "Please enter a comment" : "" }
            error={ isAddingComment && comment === "" ? true : false }
          />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClick}>
            Add comment
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar
        open={snackbarOpen}
        closeSnackbar={closeSnackbar} />
    </div>
  )
}

export default Details;