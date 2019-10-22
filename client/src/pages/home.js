import React, { Component } from "react";
import API from "../utils/API";
import { Container, Box, BoxOne } from "../components/Grid";
import {Input,SearchBtn} from "../components/SearchBox";
import LoginNavbar from "../components/LoginNavbar";
import Jumbotron from "../components/Jumbotron";
import GroceryCard from "../components/GroceryCard";
import RecipeCard from "../components/RecipeCard";
import List from "../components/List";


class Home extends Component {
  state = {
    listOfResults: [],
    title: "Pie",
    recipesGroceryList: [],
    groceryListArray: [],
    idGroceryListArray: [],
    yourServings: 0,
    toSaveGroceryListArray:[],
    edit: false,
    addNew: false,
    newName: "",
    newUnit: "",
    newAmount: "",
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
    //console.log(this.state.title);
    //console.log(this.state.yourServings);
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
          let aisle = ingredient.aisle;
          unit = unit.toLowerCase();

          if(aisle==="Produce"){
            aisle = "Vegetables & Fruits" }
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
          if (yourServing >= 1){
            yourServing = (yourServing + 0.4)}
          let finalAmountForUser = Math.round(yourServing);

          if(finalAmountForUser === 0){
            finalAmountForUser = 1 }

          ingredient = {name:name, id:id, amount:amount,
            unit:unit, servings:servings, amountPerServing:amountPerServing,
            finalAmountForUser:finalAmountForUser, idUnit:idUnit , aisle:aisle};

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
                  if (finalIngredientList[index].amountPerServing >= 1){
                    finalIngredientList[index].amountPerServing = (finalIngredientList[index].amountPerServing + 0.4)
                  }
                  finalIngredientList[index].finalAmountForUser =  Math.round(finalIngredientList[index].amountPerServing * this.state.yourServings);
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
  //setting state for grocery list array...
  this.setState({groceryListArray:finalIngredientList});
  this.setState({toSaveGroceryListArray:finalIngredientList});
  this.setState({idGroceryListArray:idOfIngredientsList})

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

  addItem = event => {
    event.preventDefault();
    let newItemObject = {};
    
    newItemObject.idUnit= (this.state.newName + this.state.newAmount);
    newItemObject.name = this.state.newName;
    newItemObject.finalAmountForUser = this.state.newAmount;
    newItemObject.unit = this.state.newUnit;

    this.setState({
      groceryListArray: [ ...this.state.groceryListArray, newItemObject],
    });
  }

  showForm = event =>{
    event.preventDefault();
    if(this.state.addNew===false){
      this.setState({addNew: true})
    }else{
      this.setState({addNew: false})
    }
    
  }

  handleIngredientDelete = (id)=>{
    //console.log(id);
    //console.log(this.state.toSaveGroceryListArray)
    const items = this.state.groceryListArray.filter(item => item.idUnit !== id);
    this.setState({ groceryListArray: items });

    console.log(this.state.groceryListArray);
  } 

  handleIngredientUpdate = (id, amount, unit)=>{
    console.log(id);
    console.log(this.state.toSaveGroceryListArray)
    const newIngredientListState = this.state.groceryListArray.map(ingredient =>{
      if(ingredient.idUnit === id){
        ingredient.finalAmountForUser = parseInt(amount)
        ingredient.unit = unit
      }
      return ingredient;
    });
    this.setState({ groceryListArray: newIngredientListState });
  } 


  render() {
    return (
      <div>

          <LoginNavbar>
            
          </LoginNavbar>

          <Container fluid>   
          <Jumbotron>
              <h1>Chef Helper</h1>
<<<<<<< HEAD
              
=======
              <p>Your meal ideas virtual assistant app</p>
>>>>>>> c8b6bf4aedd97f0c720b3ecfa747adab252f9489
          </Jumbotron>
               
          <Box>
            <h4 className="mb-4" >Search Recipes &nbsp; <i className="fa fa-search"></i></h4>
            <p>Key Word: &nbsp; <i className="fa fa-comment"></i></p>
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
<<<<<<< HEAD

=======
         <hr style={{borderColor: "#fff"}}></hr>
>>>>>>> c8b6bf4aedd97f0c720b3ecfa747adab252f9489
        <BoxOne>
        <h4 className="mb-4"> Results &nbsp; <i className="fa fa-list-ol"></i></h4>
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
        <hr style={{borderColor: "#fff"}}></hr>
        <BoxOne>

        <div className="col-6">
         <h4 className="mb-4"> Grocery Calculator</h4>
         {this.state.recipesGroceryList.map(recipe => (

          <GroceryCard
            id={recipe.id}
            key={recipe.id}
            recipeTitle={recipe.name}
            image={recipe.image}/>
          ))}

          <Input
            value={this.state.yourServings}
            onChange={this.handleInputChange}
            name="yourServings"
            placeholder="2">
          </Input>

          <SearchBtn
            style={{ marginBottom: 10 }}
            onClick={this.calculateGroceries}>
            Calculate Groceries
          </SearchBtn>
        </div> 
         
        <div className="col-6">

          {/* //inside groceryListArray mapping
          do conditional to render good edit option 
          of grocerylist or render the not edit option */}

         
        {this.state.groceryListArray.map(item => (
           
          <List
          id={item.idUnit}
          key={item.idUnit}
          name={item.name}
          //yourServings = {this.state.yourServings}
          finalAmount = {item.finalAmountForUser}
          unit = {item.unit}
          //aisle = {item.aisle}
          handleIngredientDelete={this.handleIngredientDelete}
          handleIngredientUpdate={this.handleIngredientUpdate}

          />

          ))}

        
        
        {this.state.addNew === false? "" : (
         <div>
          <h6 className="mt-3">Add item</h6>

          <Input
            value={this.state.newAmount}
            onChange={this.handleInputChange}
            name="newAmount"
            placeholder="Amount">
          </Input>

          <Input
            value={this.state.newUnit}
            onChange={this.handleInputChange}
            name="newUnit"
            placeholder="Unit">
          </Input>

          <Input
            value={this.state.newName}
            onChange={this.handleInputChange}
            name="newName"
            placeholder="Name">
          </Input>

          <SearchBtn
            style={{ marginBottom: 10 }}
            onClick={this.addItem}>
            Add
          </SearchBtn>
         </div>
        )}

        <SearchBtn
          style={{ marginBottom: 10 }}
          onClick={this.showForm}>
         {this.state.addNew===false?"+":"-"}
        </SearchBtn> 
        
         
          {/* //btn to let you add new items

             

          //input for unit, name and amount - and btn to save new item

          //button to say done with changes and just render plain 
          results without editing material

          //element to render === readyToSendList */}

         
        </div>
        

  

        <h4 className="mb-4"> Grocery Calculator &nbsp; <i className="fa fa-cart-plus"></i></h4>
        <GroceryCard/>

        </BoxOne>
        <hr style={{borderColor: "#fff"}}></hr>
        <BoxOne>
        <h4 className="mb-4"> Coupons &nbsp; <i className="fa fa-barcode"></i></h4>
        
        </BoxOne>

        

         </Container>
    
      </div>
     
    );
  }
}

export default Home;