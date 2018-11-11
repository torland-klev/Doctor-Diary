import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton';

class Pending extends Component {
    state = {

    }
    render() {
        const title = "Pending reports"
        const backbutton = "Previous";
        const backbuttonlink = "/doctor"
        return (
            <div className='Home'>
                <Header title={title} />
                <main className='Home-main'>
                    <BackButton title={backbutton} link={backbuttonlink} />
                </main>
            </div>
        )
    }
}
export default Pending;
