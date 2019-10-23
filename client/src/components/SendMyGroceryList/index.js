import React, { Component } from 'react'
import { Input, SearchBtn } from "../SearchBox"


export default class SendsMyGroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email="Email",
      phoneNumber: "Phone Number"
    };
  }

  componentDidMount() {}

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

  render() {
    return (
      <div>
          <Input
          onChange={this.handleInputChange}
          value={this.state.phoneNumber}
          name="phoneNumber"
          placeholder="Number"/>
          
          <Input
          value={this.state.email}
          onChange={this.handleInputChange}
          name="email"
          placeholder="Email"/>

          <SearchBtn
          style={{ marginBottom: 10 }}
          onClick={this.groceryListStatus}/>
       
      </div>
    );
  }
}
