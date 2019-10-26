import React, { Component } from "react";
import API from "../utils/API";
import { Container, Box, BoxOne, Col, Row } from "../components/Grid";
import { Input, SearchBtn } from "../components/SearchBox";
import LoginNavbar from "../components/LoginNavbar";
import Jumbotron from "../components/Jumbotron";
import GroceryCard from "../components/GroceryCard";
import RecipeCard from "../components/RecipeCard";
import List from "../components/List";

import SendMyGroceryList from "../components/SendMyGroceryList";
import Footer from "../components/Footer";
import "./style.css";



class Home extends Component {
  state = {
    listOfResults: [],
    title: "Pie",
    recipesGroceryList: [],
    groceryListArray: [],
    idGroceryListArray: [],
    yourServings: 0,
    toSaveGroceryListArray: [],
    edit: false,
    addNew: false,

    list: false,
    newName: "",
    newUnit: "",
    newAmount: ""

  };

  componentDidMount() {
    this.getRecipesIds();
  }


  getRecipesIds = () => {
    API.spoonacularId(this.state.title)
      .then(res => {
        console.log(this.state.title);
        this.setState({ listOfResults: res.data.results });
        console.log(this.state.listOfResults);
      })
      .catch(err => console.log(err));

  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  };

  handleSubmit = event => {
    event.preventDefault();
    this.getRecipesIds(this.state.title);

  };

//method to calculate the grocery list 

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

        if (aisle === "Produce") {
          aisle = "Vegetables & Fruits";
        }
        if (unit === "serving" || unit === "" || unit === " ") {
          unit = "servings";
        }
        if (
          unit === "teaspoon" ||
          unit === "tablespoon" ||
          unit === "teaspoons"
        ) {
          unit = "tablespoons";
        }
        if (unit === "cup") {
          unit = "cups";
        }

        let idUnit = id + unit;
        console.log(idUnit);
        let amountPerServing = amount / servings;
        let yourServing = amountPerServing * this.state.yourServings;
        if (yourServing >= 1) {
          yourServing = yourServing + 0.4;
        }
        let finalAmountForUser = Math.round(yourServing);

        if (finalAmountForUser === 0) {
          finalAmountForUser = 1;
        }

        ingredient = {
          name: name,
          id: id,
          amount: amount,
          unit: unit,
          servings: servings,
          amountPerServing: amountPerServing,
          finalAmountForUser: finalAmountForUser,
          idUnit: idUnit,
          aisle: aisle
        };

        separateIngredients.push(ingredient);

        let index = idOfIngredientsList.indexOf(idUnit);
        if (index < 0) {
          console.log(index);
          idOfIngredientsList.push(idUnit);
          finalIngredientList.push(ingredient);
        } else {
          if (finalIngredientList[index].idUnit === ingredient.idUnit) {
            finalIngredientList[index].amountPerServing =
              finalIngredientList[index].amountPerServing +
              ingredient.amountPerServing;
            if (finalIngredientList[index].amountPerServing >= 1) {
              finalIngredientList[index].amountPerServing =
                finalIngredientList[index].amountPerServing + 0.4;
            }
            finalIngredientList[index].finalAmountForUser = Math.round(
              finalIngredientList[index].amountPerServing *
                this.state.yourServings
            );
            if (finalIngredientList[index].finalAmountForUser === 0) {
              finalIngredientList[index].finalAmountForUser = 1;
            }
          } else {
            console.log(finalIngredientList[index].unit);
            console.log(ingredient.unit);
            idOfIngredientsList.push(id);
            finalIngredientList.push(ingredient);
          }
        }

        return ingredient;
      });

      recipe = ingredientArray;

      console.log(recipe);

      return recipe;
    });


    finalIngredientList.sort((a, b) => (a.name > b.name ? 1 : -1));
    separateIngredients.sort((a, b) => (a.name > b.name ? 1 : -1));

    console.log(finalIngredientList);
    console.log(separateIngredients);
    console.log(idOfIngredientsList);
    console.log(recipeArray);
    //setting state for grocery list array...
    this.setState({ groceryListArray: finalIngredientList });
    this.setState({ toSaveGroceryListArray: finalIngredientList });
    this.setState({ idGroceryListArray: idOfIngredientsList });
    this.setState({list:true})
  };

  //method to add grocery to the state
  addToGrocery = id => {

    API.recipeGroceryList(id)
      .then(res => {
        console.log(res.data);
        const recipe = res.data;
        let recipeDetail = {};

        recipeDetail.id = recipe.id;
        recipeDetail.name = recipe.title;
        recipeDetail.image = recipe.image;
        recipeDetail.ingredients = recipe.extendedIngredients;
        recipeDetail.servings = recipe.servings;

        this.setState({

          recipesGroceryList: [...this.state.recipesGroceryList, recipeDetail]

        });
      })
      .catch(err => console.log(err));
  };

  //methd to add new item to the list of groceries
  addItem = event => {
    event.preventDefault();
    let newItemObject = {};

    newItemObject.idUnit = this.state.newName + this.state.newAmount;
    newItemObject.name = this.state.newName;
    newItemObject.finalAmountForUser = this.state.newAmount;
    newItemObject.unit = this.state.newUnit;

    this.setState({
      groceryListArray: [...this.state.groceryListArray, newItemObject]
    });
  };

  //method to display form
  showForm = event => {
    event.preventDefault();
    if (this.state.addNew === false) {
      this.setState({ addNew: true });
    } else {
      this.setState({ addNew: false });
    }
  };

  //method to change grocery list type to be rendered
  groceryListStatus = event => {
    event.preventDefault();
    if (this.state.edit === false) {
      this.setState({ edit: true });
    } else {
      this.setState({ edit: false });
    }
  };

  //handle to delete item from list
  handleIngredientDelete = id => {
    //console.log(id);
    //console.log(this.state.toSaveGroceryListArray)
    const items = this.state.groceryListArray.filter(
      item => item.idUnit !== id
    );
    this.setState({ groceryListArray: items });

    console.log(this.state.groceryListArray);

  };

  //handle an update for a item of grocery list
  handleIngredientUpdate = (id, amount, unit) => {
    console.log(id);
    console.log(this.state.toSaveGroceryListArray);
    const newIngredientListState = this.state.groceryListArray.map(
      ingredient => {
        if (ingredient.idUnit === id) {
          ingredient.finalAmountForUser = parseInt(amount);
          ingredient.unit = unit;
        }
        return ingredient;

      }
    );
    this.setState({ groceryListArray: newIngredientListState });

  };


//rendering below
  render() {
    return (
      <div>


        <LoginNavbar></LoginNavbar>

        <Container fluid>
          <Jumbotron>
            <h1>Chef Helper</h1>
            <p>Your meal ideas virtual assistant app</p>
          </Jumbotron>

          <Box>
            <div className="container">

            <h4 className="mb-4" >Search Recipes &nbsp; <i className="fa fa-search"></i></h4>
            <p>Key Word: &nbsp; <i className="fa fa-comment"></i></p>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"

              placeholder="Chicken Teriyaki"
            ></Input>

            <SearchBtn
              style={{ float: "right", marginBottom: 10 }}
              onClick={this.handleSubmit}
            >
              Search
          </SearchBtn>
          </div>
          

          
         </Box>
         <hr style={{borderColor: "#fff"}}></hr>
      <BoxOne>
            <h4 className="mb-4"> Results &nbsp; <i className="far fa-hand-point-down"></i></h4>
            <Row>
              {this.state.listOfResults.map(recipe => (
                <Col size="md-4" key={recipe.id}>
                  <RecipeCard
                    id={recipe.id}
                    addToGrocery={this.addToGrocery}

                    //saveABook = {this.saveABook}
                    recipeTitle={recipe.title}
                    //authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
                    image={recipe.image}
                    servings={recipe.servings}

                    readyInMinutes={recipe.readyInMinutes}
                  />
                </Col>
              ))}
            </Row>
          </BoxOne>

          <hr style={{ borderColor: "#fff" }}></hr>
          
          
          <BoxOne>
           
           <div>
              <h4 className="mb-4"> Grocery Calculator &nbsp; <i class="fab fa-nutritionix"></i></h4>

            <Row>
              {/* //column left */}

            <div className="col-6">
              <Row>
                {this.state.recipesGroceryList.map(recipe => (
                   <div key={recipe.id}>
                  <Col size="sm-12 md-12 lg-6" >
                  
                   <GroceryCard
                     id={recipe.id}
                      recipeTitle={recipe.name}
                      image={recipe.image}
                    />
                    </Col>
                   </div>
                  
                ))}
              </Row>
            
              
              <Row>
              <div className="container w-100">
              <p className="yourservings mr-4" style={{ fontStyle: "" }}>How many servings?</p>
              <Input 
                value={this.state.yourServings}
                onChange={this.handleInputChange}
                name="yourServings"
                placeholder="1"></Input>
              </div>
              
              <SearchBtn
                disabled={this.state.list? true:false} 
                style={{ marginBottom: 20, marginLeft:97, marginTop: 10 }}
                onClick={this.calculateGroceries}
              >
                Calculate Groceries
              </SearchBtn>
              </Row>
              
            

            
              {/* //inside groceryListArray mapping
          do conditional to render good edit option 
          of grocerylist or render the not edit option */}
          
             

              {this.state.addNew === false || this.state.edit === false ? (
                ""
              ) : (
                <div>
                  <h6 className="mt-3">Add item</h6>

                  <Input
                    value={this.state.newAmount}
                    onChange={this.handleInputChange}
                    name="newAmount"
                    placeholder="Amount"
                  ></Input>

                  <Input
                    value={this.state.newUnit}
                    onChange={this.handleInputChange}
                    name="newUnit"
                    placeholder="Unit"
                  ></Input>

                  <Input
                    value={this.state.newName}
                    onChange={this.handleInputChange}
                    name="newName"
                    placeholder="Name"
                  ></Input>

                  <SearchBtn
                    style={{ marginBottom: 10 }}
                    onClick={this.addItem}
                  >
                    Add
                  </SearchBtn>
                </div>
              )}

              {this.state.edit === false ? (
                ""
              ) : (
                <SearchBtn style={{ marginBottom: 10 }} onClick={this.showForm}>
                  {this.state.addNew === false ? "+" : "-"}
                </SearchBtn>
              )}

               {this.state.list === false? "":(
                  <SearchBtn
                  style={{ marginBottom: 10 }}
                  onClick={this.groceryListStatus}
                >
                  {this.state.edit === false ? "Edit" : "Done"}
                </SearchBtn>
               )} 
              

              {this.state.edit === false &&
              this.state.groceryListArray.length > 0 ? (
                <SendMyGroceryList toSend={this.state.groceryListArray} />
              ) : (
                ""
              )}
               </div>

              {/* //column right */}
              <div className="col-6">
              <h6>My Grocery List...</h6>
                {this.state.groceryListArray.map(item => (
                  <div key={item.idUnit}>
                  <List
                    id={item.idUnit}
                    
                    name={item.name}
                    edit={this.state.edit}
                    //yourServings = {this.state.yourServings}
                    finalAmount={item.finalAmountForUser}
                    unit={item.unit}
                    //aisle = {item.aisle}
                    handleIngredientDelete={this.handleIngredientDelete}
                    handleIngredientUpdate={this.handleIngredientUpdate}
                  /></div>
                  
                ))}
              </div>

              <Footer>
      
              </Footer>

            </Row>
            </div>
           
          </BoxOne>
        </Container>
      </div>

    );
  }
}

export default Home;
