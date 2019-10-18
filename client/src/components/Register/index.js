import React, { Component } from 'react';
import {register} from "../UserFunctions"


//class component

class Register extends Component {

 constructor(){
    super()
    this.state={
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        username: "",
        password: ""
    }
    this.onChange = this.onChange.bind(this)
    this.onChange = this.onSubmit.bind(this)
 }


 onChange(e){
     this.setState({[e.target.name]:e.target.value})
 }

 onSubmit(e){
     e.preventDefault();

     const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone_number: this.state.phone_number,
        username: this.state.username,
        password: this.state.password
     }

     register(user).then(res =>{
        
             this.props.history.push("/login")
         
     })
 }

 render(){
     return(
         <div className="container">
             <div className="row">
                 <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 ffont-weight-normal">
                                Please sign in
                            </h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input 
                                type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="First Name"
                                value={this.state.first_name}
                                onChange={this.onChange}/>

                              
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input 
                                type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Last Name"
                                value={this.state.last_name}
                                onChange={this.onChange}/>

                              
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                type="text"
                                className="form-control"t 
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onChange}/>

                              
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input 
                                type="text"
                                className="form-control"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={this.state.phone_number}
                                onChange={this.onChange}/>

                              
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.onChange}/>

                              
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                type="text"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChange}/>

                              
                            </div>
                            
                           <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register 
                           </button>
                        </form>
                 </div>

             </div>
         </div>
     )
 }


}

export default Register