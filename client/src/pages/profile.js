import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import LoginNavbar from "../components/LoginNavbar";
import jwt_decode from "jwt-decode"
import API from "../utils/API";
import RecipeCard from "../components/RecipeCard"
import { Col, Row } from "../components/Grid";
import "./style.css";

class Profile extends Component {
    constructor(){
        super()
        this.state={
            first_name: "",
            last_name: "",
            email: "",
            myFavoriteRecipes: []
        }
    }


    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            id: decoded._id
        })
        console.log(this.state);
        //this.getSavedRecipes(decoded.email);
        this.findUsersRecipes(decoded._id);
    }

    findUsersRecipes = (id) => {
        console.log(this.state.id);
        console.log(id);
        API.findUsersRecipes(id)
          .then(res => {
            console.log(res)
            console.log(res.data.favRecipes);
            this.setState({ myFavoriteRecipes:res.data.favRecipes});
             console.log(this.state.myFavoriteRecipes);
          })
          .catch(err => console.log(err));
      }



    // getSavedRecipes = (em) => {
    //     console.log(this.state.email);
    //     console.log(em);
    //     let email ={
    //         email: em
    //     }
    //     API.favUser(email)
    //       .then(res => {
    //         console.log(res)
    //         console.log(res.data.favRecipes);
    //         this.setState({ myFavoriteRecipes:res.data.favRecipes});
    //          console.log(this.state.myFavoriteRecipes);
    //       })
    //       .catch(err => console.log(err));
    //   }


    render(){
        return(
            
            <div>
            <LoginNavbar></LoginNavbar>
            <div className="container" style={{marginTop:100}}>
              <div className="jumbotron mt-5 board" style={{backgroundImage: `url(${"https://i.pinimg.com/236x/2f/14/78/2f1478d8f279b3808992879134450277--kara-tahtalar-bluebirds.jpg"})`}}>
                  <div className = "col-sm-8 mx-auto">
                      <h1 className= "text-center">
                          Saved Recipes
                      </h1>  
                  </div>
                  
                    
            <Row>
            {this.state.myFavoriteRecipes.map(recipe => (
            
                
                <div className="col-sm-12 col-md-6 col-lg-6" key={recipe.spoonacularId}>
                 <Col size="sm-12 md-12 lg-6" >   
                  <RecipeCard
                    id={recipe.theId}   
                    addToGrocery = {false}
                    //saveABook = {this.saveABook}
                    recipeTitle={recipe.recipeName}
                    //authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
                    image={recipe.img}
                    servings={recipe.servings}
                    readyInMinutes={recipe.readyInMin} 
                    />
                 </Col>   
                </div>

              ))}
             </Row>      

              </div>
              
                
            </div>
            </div>
        )
    }


}

export default Profile
