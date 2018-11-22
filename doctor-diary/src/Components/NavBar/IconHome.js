import React from 'react';

// Icon
function IconHome(props) {
    const homeFill = props.homeFill || 'white'
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" aria-labelledby="home">
        <title id="home"> Home Icon</title>
          <path fill="none" d="M0 0h24v24H0V0z"/>
          <path fill={homeFill} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/>
      </svg>
    )
}

export default IconHome;
   
   // which makes this reusable component for other views
   //<IconUmbrella />