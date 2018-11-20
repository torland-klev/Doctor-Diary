import React, { Component } from "react";
import './Home.css';
import Button from '../Components/Button/Button.js'
import Header from '../Components/Header/Header.js';
import Api from '../Api.js';

import {BrowserRouter, Route, Redirect} from 'react-router-dom';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            title: "DOCTOR DIARY",
            role: "LOGIN",

            doctorButtonLink: "/doctor",
            healthOfficerButtonLink: "/healthofficer",

            loginButton: "Log in",
            userName: "",
            password: "",

            //doctorList: ["AkselJ", "CasperL", "PatrikM", "MatsW", "YahyaJ", "EllingS"],
            //dhoList: ["BjarneB"]

        }

        this.updateData = this.updateData.bind(this)
        this.attemptLogin = this.attemptLogin.bind(this)
    }

    updateData() {
        var user = document.getElementById("elementOne").value;
        //console.log("Username: " + user);
        var pass = document.getElementById("elementTwo").value;
        //console.log("two: " + pass);
        this.setState({username: user, password: pass});
        //console.log(user, pass);
    }


    attemptLogin(){

        var profile = Api.checkAuthenication(this.state.username, this.state.password);
        
        profile.then(function (response){

            console.log(response);

            if(response.exists === true){
                //Approved user
                if(response.role === "doctor"){
                    console.log("Hello Doctor " + response.user);
                    //Route til lege siden....?
                    


                }else if(response.role === "dho"){
                    console.log("Hello DHO " + response.user);
                    //Route til DHO.....?
                }
            }else{
                //Denied user
                document.getElementById("elementLoginText").innerHTML = "Username or password is wrong!";

            }

        })
    }



    render () {
        return(
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                    <h2>{this.state.role}</h2>
                    <main>
                        <div className="login-section">
                            <label className="login-text" id="elementLoginText"></label>
                            <input type="text" name="elementUsername" onKeyUp={this.updateData} className="login-input" id="elementOne" placeholder="Username" />
                            <br></br>
                            <input type="password" name="elementPassword" onKeyUp={this.updateData} className="login-input" id="elementTwo" placeholder="Password" />
                        </div>
                    </main>
                    {/*<Button title={this.state.loginButton} onClick={this.attemptLogin}/>*/}

                    <button className="login-button" onClick={this.attemptLogin}>LOGIN</button>
                    
            </main>
            </div>
        )
    }
}
