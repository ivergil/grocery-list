import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddModal } from "./AddModal";
import API from "../../utils/API";
//import $ from 'jquery';
import "./style.css";
export class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = { addModalShow: false, ingredients: [], instructions: '', title: ''}
  }

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
  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    return (

      <div >
        <div className="card" style={{ width: 300, height: 430 }} >
          <div className="img-container" style={{ height: 220, backgroundSize: "cover", backgroundImage: `url(https://spoonacular.com/recipeImages/${this.props.image})` }}>
            {/* <img alt={props.recipeTitle} src={`https://spoonacular.com/recipeImages/${props.image}`} />
        <img style={{: 'cover'}} src={ `https://spoonacular.com/recipeImages/${props.image}`} /> */}
          </div>
          <div className="content">
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
              <a className="favorite" href="#"><i className="fa fa-heart"></i></a>
            </ul>
          </div>
          <ButtonToolbar className="details">
            <Button
              variant='outline-light'
              onClick={this.handleModal}
            // onClick={()=> this.setState({addModalShow: true})}
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
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
          <button className="groceries" onClick={() => this.props.addToGrocery(this.props.id)}>
            <i className="fa fa-cart-plus" aria-hidden="true"></i>
          </button>
        </div>
        {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
        x
      </button> */}
        {/*  */}
      </div>
    );
  }

}
export default RecipeCard;

  







