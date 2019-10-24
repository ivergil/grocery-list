import React from "react";


import "./style.css";

//import $ from 'jquery';
//import "./style.css";


function RecipeCard(props) {

  // $(document).ready(function () {

  //   $('a').click(function () {

  //     $(this).attr("class", "active")
  //     $(this).text('LIKE')
  //   })

  // })

  return (
    <div >
      <div className="card" style={{ width: 300, height: 430 }} >

        <div className="img-container" style={{ height: 220, backgroundSize: "cover", backgroundImage: `url(https://spoonacular.com/recipeImages/${props.image})` }}>
          {/* <img alt={props.recipeTitle} src={`https://spoonacular.com/recipeImages/${props.image}`} />
        <img style={{: 'cover'}} src={ `https://spoonacular.com/recipeImages/${props.image}`} /> */}
        </div>


        <div className="content">

          <ul>
            <li>
              <strong>Recipe Name:</strong> {props.recipeTitle}
            </li>
            <li>
              <strong>Servings:</strong> {props.servings}
            </li>
            <li>
              <strong>Ready in:</strong> {props.readyInMinutes} mins
          </li>

            <a className="favorite" href="#"><i className="fa fa-heart"></i></a>

          </ul>

        </div>


        <button className="details">

        <i className="fa fa-plus" aria-hidden="true"></i>

        </button>

        <button className="groceries" onClick={() => props.addToGrocery(props.id)}>
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

export default RecipeCard;
