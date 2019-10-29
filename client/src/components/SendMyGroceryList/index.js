
import React, { Component } from "react";
import { Input, SearchBtn } from "../SearchBox";
import API from "../../utils/API";
import "./index.css";

class SendsMyGroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      listId: "",
      // email: "",

      stringToSend: "",
      grocery: {
        list: ""
      }
    };
  }

  componentDidMount() { }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      
    });
  console.log(event.target)
  };


  sendMessage = event => {
    event.preventDefault();


    const newIngredientListState = this.props.toSend.map(ingredient => {
      ingredient = 
      ingredient.finalAmountForUser +
        " " + ingredient.unit + " " + ingredient.name
        // checked: false
      
        
      return ingredient;
    });

    let grocery = {
      list: newIngredientListState
    };

      API.checklist(grocery)
        .then(res => {
          console.log(res.data._id);
          let listId = res.data._id;
          console.log(listId);
          this.setState({listId: res.data._id}); 
          // setTimeout(() => {            
          // }, 1000);
          this.sendTextMessage()
          })

          
        .catch(err => console.log(err));
    
  };


  sendTextMessage = () => {
    //event.preventDefault();

    console.log(this.state.listId);
    //change url to match heroku when we deploy
    API.sendGroceryList(this.state.phoneNumber, this.state.listId)
    .then(res => {
      //console.log(yourUrl);
    })
    .catch(err => console.log(err));
      alert("Message sent!");

    
    


  }



  render() {
    return (
      <div className="containersendMessage">
        <div>
        
        <Input
          onChange={this.handleInputChange}
          value={this.state.phoneNumber}
          name="phoneNumber"
          placeholder="Phone Number"
          style = {{width:200}}
        />

        {/* <Input
          onChange={this.handleInputChange}
          value={this.state.email}
          name="email"
          placeholder="your@email.com"
        /> */}

        <SearchBtn style={{ marginBottom: 10 }} onClick={this.sendMessage}>
          Send My Grocery List
        </SearchBtn>


        </div>


      </div>
    );
  };
};

export default SendsMyGroceryList ;