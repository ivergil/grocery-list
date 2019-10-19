import React from "react";
import $ from 'jquery';
import "./style.css";

function RecipeCard(props) {

  // $(document).ready(function () {

  //   $('a').click(function () {

  //     $(this).attr("class", "active")
  //     $(this).text('LIKE')
  //   })

  // })

  return (
    <div className="card">
      <div className="img-container">
        <img /*alt={props.name} src={props.image}*/ />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Recipe Name:</strong> {/*props.name*/}
          </li>
          <li>
            <strong>Servins:</strong> {/*props.occupation*/}
          </li>
          
          <a href="#">Add Favorite</a>

        </ul>

      </div>
      <button className="groceries">
        My groceries
      </button>
      <button  className="remove">
        x
      </button>
      
      {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
        x
      </button> */}

    </div>
  );
}

export default RecipeCard;
