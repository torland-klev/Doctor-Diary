import React, { Component } from 'react';

class Pending extends Component {
    state = {

    }
    render() {
        return (
            <div>
                <header>
                <h1>Pending reports</h1>
                    <button>
                        <a className='Home-link' href='/doctor'>Go back</a>
                    </button>
                </header>
            </div>
        )
    }
}
export default Pending;
