import React, { Component } from 'react';

class Declined extends Component {
    state = {

    }
    render() {
        return (
            <div>
                <header>
                <h1>Declined reports</h1>
                    <button>
                        <a className='Home-link' href='/doctor'>Go back</a>
                    </button>
                </header>
            </div>
        )
    }
}

export default Declined;
