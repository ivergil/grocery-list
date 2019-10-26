import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import "./style.css";

class Navbar extends Component {
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push("/")
    }


    render(){
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className = "nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className = "nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>

            </ul>
        )


        const userLink = (
            <ul className="navbar-nav">
                <li className = "nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>
                <li className = "nav-item">
                    <Link to="/account" className="nav-link">
                        Account
                    </Link>
                </li>
                <li className = "nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Log Out
                    </a>
                </li>

            </ul>


        )


        return (
            <nav className="navbar navbar-expand-lg navbar-dark rounded" style = {{backgroundColor: "#24221c"}}>
                <img className ="chefBrand" id="chefhat" src="https://cdn.pixabay.com/photo/2014/04/03/00/38/grilling-308914__340.png" alt="" width="125px" height="60px" ></img> &nbsp; 
                &nbsp; <a className=" text-light navbar-brand" href="/"><h3>Chef Helper</h3></a>
                <button className="navbar-toggler navTg"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    >
                    <span className="navbar-toggler-icon"></span>    


                </button>

                <div className="collapse navbar-collapse justify-content-md-end" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                              Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
                
            </nav> 
        ) 


    }
}

export default withRouter(Navbar) 

