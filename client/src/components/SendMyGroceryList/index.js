import React, { Component } from 'react'
import { Input, SearchBtn } from "../SearchBox"
import API from "../../utils/API";

export default class SendsMyGroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "Phone Number",
      stringToSend: ""
      
    };
  }

  componentDidMount() {}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  sendMessage = event => {
    event.preventDefault();
    let array = []
    const newIngredientListState = this.props.toSend.map(ingredient =>{
       ingredient =  ingredient.finalAmountForUser + " " + ingredient.unit + " " + ingredient.name;
        return ingredient
    });
    let stringToSend = newIngredientListState.join(", ")
    API.sendGroceryList(this.state.phoneNumber , stringToSend )
    .then(res => {
        console.log(stringToSend);
       
      })
      .catch(err => console.log(err));
      alert("Message sent!");
    
  };



  render() {
    return (
      <div>
          <Input
          onChange={this.handleInputChange}
          value={this.state.phoneNumber}
          name="phoneNumber"
          placeholder="Number"/>

          <SearchBtn
          style={{ marginBottom: 10 }}
          onClick={this.sendMessage}>
              Text Me Grocery List
          </SearchBtn>
       
      </div>
    );
  }
}
