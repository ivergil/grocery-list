import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import LoginNavbar from "../components/LoginNavbar";
import jwt_decode from "jwt-decode"
import API from "../utils/API";
import RecipeCard from "../components/RecipeCard"
import { Col, Row } from "../components/Grid";

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
        })

        this.getSavedRecipes();
    }


    getSavedRecipes = () => {
        API.favUser({email:this.state.email})
          .then(res => {
            console.log(res.data.favRecipes);
            this.setState({ myFavoriteRecipes:res.data.favRecipes});
             console.log(this.state.myFavoriteRecipes);
          })
          .catch(err => console.log(err));
      }


    render(){
        return(
            
            <div>
            <LoginNavbar></LoginNavbar>
            <div className="container">
              <div className="jumbotron mt-5">
                  <div className = "col-sm-8 mx-auto">
                      <h1 className= "text-center">
                          Saved Recipes
                      </h1>  
                  </div>
                  
                    
            <Row>
            {this.state.myFavoriteRecipes.map(recipe => (
            
                
                <div className="col-6" key={recipe.spoonacularId}>
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
