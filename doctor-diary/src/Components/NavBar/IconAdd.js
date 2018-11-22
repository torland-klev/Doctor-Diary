import React from 'react';

function IconAdd(props) {
    const addFill = props.addFill || 'white'
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" aria-labelledby="add">
            <title id="add">Add Icon</title>
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path fill={addFill} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
    )
  }

export default IconAdd;