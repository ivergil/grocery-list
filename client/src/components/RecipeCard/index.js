
import React, { Component } from 'react'
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddModal } from "./AddModal";
import "./style.css";
import jwt_decode from "jwt-decode";
import API from "../../utils/API";
import { decode } from 'punycode';

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", addModalShow: false, ingredients: [], instructions: '', title: ''
    
    };
  }

  componentDidMount() {}
  

  handleModal = event => {
    event.preventDefault();
    console.log(this.props.id)
    API.recipeGroceryList(this.props.id)
      .then(res => {
        console.log(res.data)

        let ingredientsList = res.data.nutrition.ingredients

        let ingredients = ingredientsList.map(ingredient =>{
          ingredient.key = ingredient.amount + ingredient.unit + ingredient.name;
          return ingredient
        })

        // console.log(this.state.title);
        this.setState({ addModalShow: true });
        this.setState({ ingredients: ingredients })
        this.setState({ instructions: res.data.instructions })
        this.setState({title: res.data.title})
        console.log(this.state.ingredients);
        console.log(this.state.title);
    
      })
      .catch(err => console.log(err));

  };


saveToFavorites = () => {
  
    const token = localStorage.usertoken
    if(token){
    const decoded = jwt_decode(token)
    console.log(decoded.email);
    this.setState({email:decoded.email});
    let id = decoded.email + this.props.id
    let recipe={
      spoonacularId: id,
      recipeName:this.props.recipeTitle,
      servings: this.props.servings,
      img:this.props.image,
      readyInMin:this.props.readyInMinutes,
      theId:this.props.id
     }

    API.saveRecipe(recipe)
    .then(res => {
      console.log(res);
      let data = res.data
      console.log(data);
      API.updateUser(decoded.email , data)
      .then(res=>{
        console.log(res)
        alert("Recipe saved in your profile!")
      }) .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
  }else{
  alert("Sorry, you have to login to be able to save a recipe!")
  }
    

    
}

//updateUser = ()=> {

//}

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <div className="contDiv">

        <div className="card recipecard"  style={this.props.addToGrocery === false? {height:300}:{height:430}}>

  
          <div className="img-container" style={{ backgroundSize: "cover", backgroundImage: `url(https://spoonacular.com/recipeImages/${this.props.image})` }}>
            {/* <img alt={props.recipeTitle} src={`https://spoonacular.com/recipeImages/${props.image}`} />
          <img style={{: 'cover'}} src={ `https://spoonacular.com/recipeImages/${props.image}`} /> */}
          
          </div>
  
  
          <div className="content" >
  
            <ul>
              <li>
                <strong>Recipe Name:</strong> {this.props.recipeTitle}
              </li>
              <li>
                <strong>Servings:</strong> {this.props.servings}
              </li>
              <li>
                <strong>Ready in:</strong> {this.props.readyInMinutes} mins
            </li> 
            {this.props.addToGrocery === false? "":(
            <button className="favorite fav1" href="#" onClick={this.saveToFavorites}> <i className="fa fa-heart"></i></button>)}
  
            </ul>
  
          </div>

          <ButtonToolbar className="details">
            <Button
              variant='outline-light'
              onClick={this.handleModal}
            // onClick={()=> this.setState({addModalShow: true})}
            >
              <i className="fas fa-eye details"></i>
            </Button>

            <div key={this.props.id}>
              
            <AddModal     
              id = {this.props.id}
              show={this.state.addModalShow}
              ingredients={this.state.ingredients}
              instructions={this.state.instructions}
              title={this.state.title}
              onHide={addModalClose}
            />
            </div>
            
          </ButtonToolbar>

          {this.props.addToGrocery === false? "":(
             <button className="groceries fav2" onClick={() => this.props.addToGrocery(this.props.id)}>
             <i className="fa fa-cart-plus" aria-hidden="true"></i>
           </button>
          )}
         
  
  
        </div>
  
        {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
          x
        </button> */}
        {/*  */}
      </div>
  
    );
  }
}


