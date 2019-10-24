import React, {Component} from 'react';
import {SearchBtn} from "../SearchBox";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToBeChanged: '',
      amount: this.props.finalAmount,
      display: true,
      unit: this.props.unit
      
    };
  }

  componentDidMount() {
    
  }

  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  };

  saveChanges = event =>{
    event.preventDefault();
    this.props.handleIngredientUpdate(this.props.id, this.state.amount, this.state.unit);

  }

  deleteIngredient = event => {
    event.preventDefault();
    this.setState({display:false});
    this.props.handleIngredientDelete(this.props.id);
   
  };



  render() {
    return (
    <div>
      {this.props.edit ?(
      <div>
      {this.state.display?(
      <div>
        <p> <input className="ff form-control" 
        id={this.props.id}
        key={this.props.id}
        style={{width:60}}
        value = {this.state.amount}
        onChange={this.handleInputChange}
        name="amount"
        placeholder="0"
         />

        <input className="ff form-control" 
        id={this.props.id}
        key={this.props.id}
        style={{width:150}}
        value = {this.state.unit}
        onChange={this.handleInputChange}
        name="unit"
        placeholder="ounces"
         />

         <span> {this.props.name}</span></p>

         <SearchBtn
            style={{ marginBottom: 10, backgroundColor: "white", color: "red" }}
            onClick={this.deleteIngredient}>
            x
          </SearchBtn>
          <SearchBtn
            style={{ marginBottom: 10, backgroundColor: "white", color: "red" }}
            onClick={this.saveChanges}>
            Save
          </SearchBtn>

      
     </div>
      ):""
      }
      </div>
      ):(<p>{this.props.finalAmount} {this.props.unit} {this.props.name}</p>)}
    </div>
    );
  }
}





