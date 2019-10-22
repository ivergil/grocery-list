import React from "react";


import "./style.css";
=======
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
      <div className="card" style={{ width: 300, height: 400 }} >

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

            <a href="#">Add Favorite</a>


          </ul>

        </div>

        
        <button className="groceries">
          +

      </div>
      <button className="groceries" onClick={() => props.addToGrocery(props.id)}>
        My groceries
      </button>
 >
        

        {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
        x
      </button> */}
{/*  */}
      </div>
    </div>
  );
}

export default RecipeCard;
