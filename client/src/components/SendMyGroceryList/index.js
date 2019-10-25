import React, { Component } from "react";
import { Input, SearchBtn } from "../SearchBox";
import API from "../../utils/API";

export default class SendsMyGroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "Phone Number",
      stringToSend: "",
      grocery: {
        list: ""
      }
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

    const newIngredientListState = this.props.toSend.map(ingredient => {
      ingredient =
        ingredient.finalAmountForUser +
        " " +
        ingredient.unit +
        " " +
        ingredient.name;
      return ingredient;
    });

    let grocery = {
      list: newIngredientListState
    };

    //this.setState({ grocery.list: [newIngredientListState] })

  //   API.checklist(grocery)
  //     .then(res => {
  //       console.log(res.data._id);
  //       let yourUrl = "http://localhost:3000/yourchecklist/" + res.data._id + ""

  //       //change url to match heroku when we deploy
  //       API.sendGroceryList(this.state.phoneNumber , "app-friends-finder.herokuapp.com")
  //         .then(res => {
  //           console.log(yourUrl);
  //         })
  //         .catch(err => console.log(err));
  //       alert("Message sent!");
  //     })
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div>
        <Input
          onChange={this.handleInputChange}
          value={this.state.phoneNumber}
          name="phoneNumber"
          placeholder="Number"
        />

        <SearchBtn style={{ marginBottom: 10 }} onClick={this.sendMessage}>
          Text Me Grocery List
        </SearchBtn>
      </div>
    );
  }
}
