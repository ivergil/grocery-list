import React, { Component } from 'react'
import "./style.css";
import jwt_decode from "jwt-decode";
import API from "../../utils/API";
import { decode } from 'punycode';

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    
    };
  }

  componentDidMount() {}

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  


//   saveChanges = event => {
//     event.preventDefault();
//     this.props.handleIngredientUpdate(
//       this.props.id,
//       this.state.amount,
//       this.state.unit
//     );
//   };

//   deleteIngredient = event => {
//     event.preventDefault();
//     this.setState({ display: false });
//     this.props.handleIngredientDelete(this.props.id);
//   };

saveToFavorites = () => {
  
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded.email);
    this.setState({email:decoded.email});
    let id = decoded.email + this.props.id
    let recipe={
      spoonacularId: id,
      recipeName:this.props.recipeTitle,
      servings: this.props.servings,
      img:this.props.image,
      readyInMin:this.props.readyInMinutes
     }

    API.saveRecipe(recipe)
    .then(res => {
      console.log(res);
      let data = res.data
      console.log(data);
      API.updateUser(decoded.email , data)
      .then(res=>{
        console.log(res)
      }) .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
    
    

    
}

//updateUser = ()=> {

//}

  render() {
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
  
            <button className="favorite" href="#"onClick={this.saveToFavorites}> <i className="fa fa-heart"></i></button>
  
            </ul>
  
          </div>
  
  
          <button className="details">
  
            <i className="fa fa-info"></i>
  
          </button>
          {this.props.addToGrocery === false? "":(
             <button className="groceries" onClick={() => this.props.addToGrocery(this.props.id)}>
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

