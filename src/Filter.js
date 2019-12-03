import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Filter.css';

function Filter(props) {

  const [value, setValue] = useState({from: 1, to: 5});
    
  return (
    
    <div className='Filter'>
      <div className="Filter-from">
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend">From</Typography>
          <Rating
            name="simple-controlled-1"
            value={value.from}
            onChange={(event, newValue) => {
              setValue(prevValue => ({from: newValue, to: prevValue.to}));
            }}
          />
        </Box>
      </div>
      <div className="Filter-to">
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend">To</Typography>
          <Rating
            name="simple-controlled-2"
            value={value.to}
            onChange={(event, newValue) => {
              setValue(prevValue => ({from: prevValue.from, to: newValue}));
            }}
          />
        </Box>
      </div>
    </div>
  );
  
}

export default Filter;