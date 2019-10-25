import React, {Component} from 'react';
import {SearchBtn} from "../SearchBox";
import "./style.css";

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
      <div className="row">
        <div className="col-8">
        <div style={{ float:"left" }} > 
        <input className="ff form-control"
        //className="mr-2 ml-2" 
        id={this.props.id}
       // key={this.props.id}
        style={{width:60, marginRight:10, marginLeft:10}}
        value = {this.state.amount}
        onChange={this.handleInputChange}
        name="amount"
        placeholder="0"
         /></div>
         
        <div style={{ float:"left" }}>
        <input className="ff form-control" 
        //className="mr-2 ml-2"  
        id={this.props.id}
        //key={this.props.id}
        style={{width:150, marginRight:10, marginLeft:10}}
        value = {this.state.unit}
        onChange={this.handleInputChange}
        name="unit"
        placeholder="ounces"
         />
        </div>
        

         <div style={{ float:"left" }}> {this.props.name} </div>
         </div>
        <div className="col-4">
         <SearchBtn
           
            style={{ float:"left" }} 
            style={{ marginBottom: 10, backgroundColor: "white", color: "red", marginRight: 10  }}
            onClick={this.deleteIngredient}>
            x
          </SearchBtn>
          <SearchBtn
          
            style={{ float:"left", marginLeft: 10 }} 
            style={{ marginBottom: 10, backgroundColor: "white", color: "red" }}
            onClick={this.saveChanges}>
            Save
          </SearchBtn>
          </div>   
    
     </div>
      ):""
      }
      </div>
      ):(<p>{this.props.finalAmount} {this.props.unit} {this.props.name}</p>)}
    </div>
    
    );
  }
}





