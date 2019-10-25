import React from "react";

import "./style.css";

function GroceryCard(props) {
  return (
    <div className="mb-4 mr-2 ml-2">
      <div className="card" style={{ width: 300, height: 250 }} >
      <div className="img-container" style={{ height: 185, backgroundSize: "cover", backgroundImage: `url(${props.image})` }}>
        </div>
        <div className="content">
          
          <ul>
          
            <li className="recipeTittle">
              <strong> {props.recipeTitle}</strong >
            </li>
          </ul>
        </div>
        

        {/* <button onClick={() => props.removeFriend(props.id)} className="remove">
       x
     </button> */}
      </div>
    </div>

  )
}


export default GroceryCard;