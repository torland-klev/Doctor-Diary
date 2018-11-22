import React from 'react';

function IconList(props) {
    const listFill = props.listFill || 'white'
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" aria-labelledby="list">
            <title id="list">List Icon</title>
            <path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/>
            <path fill={listFill} d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h12v-4H8v4zm0 5h12v-4H8v4zM8 5v4h12V5H8z"/>
        </svg>
    )
  }

export default IconList;