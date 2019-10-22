import React from "react";
import "./style.css";

function GroceryCard(props) {
  return (
    <div className="mb-4 mr-2 ml-2">
      <div className="card" style={{ width: 150, height: 200 }} >
        <div className="img-container" style={{ height: 108, backgroundSize: "cover", backgroundImage: `url(https://spoonacular.com/recipeImages/${props.image})` }}>
        </div>
        <div className="content">
          <ul>
            <li>
              <strong>Recipe Name:</strong> {props.recipeTitle}
            </li>
          </ul>
        </div>
        <button className="remove">
          x
     </button>
        {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
       x
     </button> */}
      </div>
    </div>
  );
}


export default GroceryCard;