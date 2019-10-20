import React, { Component } from "react";
import API from "../utils/API";
import { Container, Box, BoxOne } from "../components/Grid";
import {Input,SearchBtn} from "../components/SearchBox";
import LoginNavbar from "../components/LoginNavbar";
import Jumbotron from "../components/Jumbotron";
import GroceryCard from "../components/GroceryCard"
import RecipeCard from "../components/RecipeCard"



class Home extends Component {
  state = {
    listOfResults: [],
    title: "chicken",
    recipesGroceryList: [],
    groceryListArray: [],
    yourServings: 6

  };

  componentDidMount() {
    this.getRecipesIds();
  }


getRecipesIds = () => {
  API.spoonacularId(this.state.title)
    .then(res => {
       console.log(this.state.title);
      this.setState({ listOfResults:res.data.results });
       console.log(this.state.listOfResults);
    })
    .catch(err => console.log(err));
}


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.title)
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getRecipesIds(this.state.title);
   
  };

//   saveABook = (bookQuery) => {
//       API.saveBook(bookQuery)
//         .then(res => {console.log(res); this.loadBooks()})
//         .catch(err => console.log(err));
//   }

  calculateGroceries = () => {


  let finalIngredientList = [];
  let idOfIngredientsList = [];
  let separateIngredients = [];

  let recipeArray = this.state.recipesGroceryList.map(recipe => {
        //console.log(recipe.servings);
        let servings = recipe.servings;
        let ingredients = recipe.ingredients;

        let ingredientArray = ingredients.map(ingredient => {

          let name = ingredient.name;
          let amount = ingredient.amount;
          let id = ingredient.id;
          let unit = ingredient.unit;
          unit = unit.toLowerCase();

          if(unit === "serving" || unit === "" || unit === " "){
            unit = "servings"}
          if(unit === "teaspoon" || unit === "tablespoon" || unit === "teaspoons" ){
            unit = "tablespoons"}
          if(unit === "cup"){
            unit = "cups"}

          let idUnit = id + unit; 
          console.log(idUnit);
          let amountPerServing = (amount/servings);
          let yourServing = (amountPerServing * this.state.yourServings);
          let finalAmountForUser = parseInt(yourServing);

          

          if(finalAmountForUser === 0){
            finalAmountForUser = 1
          }

          ingredient = {name:name, id:id, amount:amount,
             unit:unit, servings:servings, amountPerServing:amountPerServing,
             finalAmountForUser:finalAmountForUser, idUnit:idUnit};

             separateIngredients.push(ingredient);

          let index = idOfIngredientsList.indexOf(idUnit);

              if (index < 0){
                console.log(index);

                idOfIngredientsList.push(idUnit);
                finalIngredientList.push(ingredient);
              }
              
             else{
                if(finalIngredientList[index].idUnit === ingredient.idUnit){
                  finalIngredientList[index].amountPerServing = (finalIngredientList[index].amountPerServing + ingredient.amountPerServing);
                  finalIngredientList[index].finalAmountForUser =  parseInt(finalIngredientList[index].amountPerServing * this.state.yourServings);
                    if(finalIngredientList[index].finalAmountForUser === 0){
                      finalIngredientList[index].finalAmountForUser = 1
                    }
                
                }
  
            
  
                else{
                  console.log(finalIngredientList[index].unit);
                  console.log(ingredient.unit);
                  idOfIngredientsList.push(id);
                  finalIngredientList.push(ingredient);
                }



             }
             

             
          //console.log

        
         //console.log(this.state.groceryListArray);

         return ingredient;
        })

        
        recipe = ingredientArray;

        console.log(recipe);

        return recipe;

      })

      finalIngredientList.sort((a, b) => (a.name > b.name) ? 1 : -1);
      separateIngredients.sort((a, b) => (a.name > b.name) ? 1 : -1);

  console.log(finalIngredientList);
  console.log(separateIngredients);
  console.log(idOfIngredientsList);
  console.log(recipeArray);
  this.setState({groceryListArray:finalIngredientList});
  //console.log(this.state.groceryListArray)

  }




  addToGrocery = (id) => {

    API.recipeGroceryList(id)
      .then(res => {
         console.log(res.data);
        const recipe = res.data;
        let recipeDetail = {};
        recipeDetail.id= recipe.id
        recipeDetail.name = recipe.title;
        recipeDetail.image = recipe.image;
        recipeDetail.ingredients = recipe.extendedIngredients;
        recipeDetail.servings = recipe.servings

        this.setState({
          recipesGroceryList: [ ...this.state.recipesGroceryList, recipeDetail],
        });


      })
      
    
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div>

          <LoginNavbar></LoginNavbar>

          <Container fluid>   
          <Jumbotron>
              <h1>Chef Helper</h1>
              <p>..........................</p>
          </Jumbotron>
               
          <Box>
            <h4 className="mb-4" >Search Recipes</h4>
            <p>Key Word:</p>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Chicken Teriyaki">
          </Input>
          <SearchBtn
            style={{ float: "right", marginBottom: 10 }}
            onClick={this.handleSubmit}>
            Search
          </SearchBtn>
         </Box>
        <BoxOne>
        <h4 className="mb-4"> Results</h4>
        {this.state.listOfResults.map(recipe => (

            <RecipeCard
              id={recipe.id}
              key={recipe.id}
              addToGrocery = {this.addToGrocery}
              //saveABook = {this.saveABook}
              recipeTitle={recipe.title}
              //authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
              image={recipe.image}
              servings={recipe.servings}
              readyInMinutes={recipe.readyInMinutes}/>


))}

        </BoxOne>

        <BoxOne>
        <h4 className="mb-4"> Grocery Calculator</h4>
        {this.state.recipesGroceryList.map(recipe => (

        <GroceryCard
          id={recipe.id}
          key={recipe.id}
          recipeTitle={recipe.name}
          //authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
          image={recipe.image}/>
        ))}

          <SearchBtn
            style={{ marginBottom: 10 }}
            onClick={this.calculateGroceries}>
            Calculate Groceries
          </SearchBtn>

  
        </BoxOne>

        <BoxOne>
        <h4 className="mb-4"> Coupons</h4>
        
        </BoxOne>

        

         </Container>
    
      </div>
     
    );
  }
}

export default Home;