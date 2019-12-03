import React, { useState } from 'react';
import './Filter.css';

function Filter(props) {

  function handleChange(event) {
    console.log(event)
  }
  
  return (
    <div className='Filter'>
        <select name='min-stars' id='filter-min' onChange={handleChange}>
          <option value=''>--Select min nb of stars--</option>
          <option value='1'>1 star</option>
          <option value='2'>2 stars</option>
          <option value='3'>3 stars</option>
          <option value='4'>4 stars</option>
          <option value='5'>5 stars</option>
        </select>
        <select name='min-stars' id='filter-min'>
          <option value=''>--Select max nb of stars--</option>
          <option value='1'>1 star</option>
          <option value='2'>2 stars</option>
          <option value='3'>3 stars</option>
          <option value='4'>4 stars</option>
          <option value='5'>5 stars</option>
        </select>
    </div>
  );
}

export default Filter;