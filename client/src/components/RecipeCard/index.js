import React from "react";
<<<<<<< HEAD
import $ from 'jquery'
import AddModal from './AddModal';
//import "./style.css";





=======


import "./style.css";

//import $ from 'jquery';
//import "./style.css";


>>>>>>> 7cf980ac0eb777fbd3d6721a1a29808a3a8f9bd9
function RecipeCard(props) {

  // $(document).ready(function () {

  //   $('a').click(function () {

  //     $(this).attr("class", "active")
  //     $(this).text('LIKE')
  //   })

  // })

  return (
<<<<<<< HEAD
    <div className="mb-4 mr-2 ml-2">
      <div className="card" style={{ width: 300, height: 400 }} >
=======
    <div >
      <div className="card" style={{ width: 300, height: 400 }} >

>>>>>>> 7cf980ac0eb777fbd3d6721a1a29808a3a8f9bd9
        <div className="img-container" style={{ height: 220, backgroundSize: "cover", backgroundImage: `url(https://spoonacular.com/recipeImages/${props.image})` }}>
          {/* <img alt={props.recipeTitle} src={`https://spoonacular.com/recipeImages/${props.image}`} />
        <img style={{: 'cover'}} src={ `https://spoonacular.com/recipeImages/${props.image}`} /> */}
        </div>
<<<<<<< HEAD
=======


>>>>>>> 7cf980ac0eb777fbd3d6721a1a29808a3a8f9bd9
        <div className="content">
          <ul>
            <li>
              <strong>Recipe Name:</strong> {props.recipeTitle}
            </li>
            <li>
              <strong>Servings:</strong> {props.servings}
            </li>
            <li>
<<<<<<< HEAD
              <strong>Ready in:</strong> {props.readyInMinutes} min
=======
              <strong>Ready in:</strong> {props.readyInMinutes} mins
>>>>>>> 7cf980ac0eb777fbd3d6721a1a29808a3a8f9bd9
          </li>

            <a href="#">Add Favorite</a>

<<<<<<< HEAD
          </ul>

        </div>
        <button className="groceries">
          My groceries
      </button>
        <button className="remove">
          x
      </button>

        {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
        x
      </button> */}

      </div>
=======

          </ul>

        </div>


        <button className="groceries">
          +
          </button>
      
      <button className="groceries-1" onClick={() => props.addToGrocery(props.id)}>
        My groceries
      </button>

      </div>

      {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
        x
      </button> */}
      {/*  */}
>>>>>>> 7cf980ac0eb777fbd3d6721a1a29808a3a8f9bd9
    </div>
    
  );
}









export default RecipeCard;
