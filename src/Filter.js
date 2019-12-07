import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Filter.css';

function Filter(props) {

  const [value, setValue] = useState({from: 1, to: 5});

  function handleChangeValue(event, newValue) {
    const { name } = event.target;
    if (name === 'rating-from') {
      setValue(prevValue => ({ from: newValue, to: prevValue.to }));
    } else {
      setValue(prevValue => ({ from: prevValue.from, to: newValue }));
    }
  }

  useEffect(() => {
    props.onFilterChange(value);
  }, [value])
    
  return (
    
    <div className='Filter'>
      <div className="Filter-from">
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend">From</Typography>
          <Rating
            name="rating-from"
            value={value.from}
            onChange={handleChangeValue}
          />
        </Box>
      </div>
      <div className="Filter-to">
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend">To</Typography>
          <Rating
            name="rating-to"
            value={value.to}
            onChange={handleChangeValue}
          />
        </Box>
      </div>
    </div>
  );
  
}

export default Filter;
