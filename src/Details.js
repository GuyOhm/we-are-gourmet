import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function Details(props) {

  const { onClose, open, restaurant } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title" >
      <DialogTitle id="simple-dialog-title">{restaurant && restaurant.name}</DialogTitle>
      <DialogContent>
          <DialogContentText>
            {restaurant && restaurant.averageRating}
          </DialogContentText>
          <DialogContentText>
            {restaurant && restaurant.nbOfVotes}
          </DialogContentText>
          {restaurant && restaurant.ratings.map((rating, index) => {
            return (
              <DialogContent key={index}>
                <DialogContentText>{rating.name}</DialogContentText>
                <DialogContentText>{rating.rating}</DialogContentText>
                <DialogContentText>{rating.comment}</DialogContentText>
              </DialogContent>
            )
          })}
        </DialogContent>
    </Dialog>
  )
}

export default Details;