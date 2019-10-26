import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import LoginNavbar from "../components/LoginNavbar";
import jwt_decode from "jwt-decode"
import API from "../utils/API";
import RecipeCard from "../components/RecipeCard"

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
                  
                      

            {this.state.myFavoriteRecipes.map(recipe => (
                
                <div size="md-4"key={recipe.spoonacularId}>
                  <RecipeCard
                    id={recipe.theId}   
                    addToGrocery = {false}
                    //saveABook = {this.saveABook}
                    recipeTitle={recipe.recipeName}
                    //authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
                    image={recipe.img}
                    servings={recipe.servings}
                    readyInMinutes={recipe.readyInMin} />
                </div>

              ))}
                   

              </div>
              <div className="jumbotron mt-5">
                  <div className = "col-sm-8 mx-auto">
                      <h1 className= "text-center">
                          Your Groceries List
                      </h1>  
                  </div>
                  <table className="table col-md-6 mx-auto">
                    <tbody>
                        {/* <tr>
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
                        </tr>  */}
                         
                       
                    </tbody>
                  </table>

              </div>
                
            </div>
            </div>
        )
    }


}

export default Profile
