import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import LoginNavbar from "../components/LoginNavbar";
import jwt_decode from "jwt-decode"
//import API from "../utils/API";
import "./style.css";

class Account extends Component {
    constructor(){
        super()
        this.state={
            first_name: "",
            last_name: "",
            email: ""
        }
    }


    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
        })
    }


    render(){
        return(
            <div>
            <LoginNavbar></LoginNavbar>
            <div className="container" style={{marginTop:100}}>
              <div className="jumbotron mt-5 board" style={{backgroundImage: `url(${"https://i.pinimg.com/236x/2f/14/78/2f1478d8f279b3808992879134450277--kara-tahtalar-bluebirds.jpg"})`}}>
                  <div className = "col-sm-8 mx-auto">
                      <h1 className= "text-center">
                          Account
                      </h1>  
                  </div>
                  <table className="table col-md-6 mx-auto">
                    <tbody>
                        <tr>
                            
                            <td>First Name</td>
                            <td>{this.state.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr> 
                         
                       
                    </tbody>
                  </table>

              </div>
                
            </div>
            </div>
        )
    }


}

export default Account