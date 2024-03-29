import React from 'react';

function IconNotification(props) {
    const notificationFill = props.notificationFill || 'white'

    return(
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" aria-labelledby="notification">
                <title id="notification">Notification Item</title>
                <path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/>
                <path fill={notificationFill} d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm7-6v-6c0-3.35-2.36-6.15-5.5-6.83V1.5h-3v2.67C7.36 4.85 5 7.65 5 11v6l-2 2v1h18v-1l-2-2zm-6-1h-2v-2h2v2zm0-4h-2V8h2v4z"/>
            </svg>
    )
  }

export default IconNotification;