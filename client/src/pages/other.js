import React, { Component } from "react";
import API from "../utils/API";
import { Container, Box, BoxOne } from "../components/Grid";
import {SearchBtn} from "../components/SearchBox";
import LoginNavbar from "../components/LoginNavbar";

class CheckList extends Component {
    state = {
      list: [],
      id: "",
      storedList: []

    };

  componentDidMount() {
   //run the get list method
    this.getList();
  }

  //using the id params get the id list details to render in page
  getList = () => {
    API.getList(this.props.match.params.id)
      .then(res => {
        console.log(res);
        console.log(res.data.list);
        let newList = res.data.list;

        console.log(newList);
        //map to change values of newList to make then objects
          let newArrayList = newList.map(item =>{
            item = {
              value: item,
              checked: false
            }

            return item
          }) 

          console.log(newArrayList);
          //figure out if there is changes...
          let stored = localStorage.getItem(res.data._id)
            //if changes...
            if(stored){

              let array =  JSON.parse(stored); 

              this.setState({ id:res.data._id, list:newArrayList, 
              storedList:array });

              console.log(this.state)
            }
            //if not changes
             //set state and store in localstorage
            else{

              let theNewArrayList =  JSON.stringify(newArrayList)

              localStorage.setItem(res.data._id , theNewArrayList );

              let theArray = localStorage.getItem(res.data._id);
              let array =  JSON.parse(theArray); 

              this.setState({ id:res.data._id, list:newArrayList, 
                storedList: array});
                console.log(this.state)
            }
      })
      .catch(err => console.log(err));
  };

  checkItem = (value) =>{
    let listArray = this.state.storedList.map(item => {

      if(item.value === value){
         if(item.checked === false){
           item.checked = true
         }else{
           item.checked = false
         }
      }
      return item
    });

    this.setState({storedList: listArray});
    //remove old dated stored data
    localStorage.removeItem(this.state.id);
    //stringify the listArray data
    let theNewList =  JSON.stringify(listArray)

    localStorage.setItem(this.state.id, theNewList);


  }




  render() {
    return (
      <div>
      <LoginNavbar></LoginNavbar>
        <br></br>
        <br></br>

        <h2>Your CheckList:</h2>
       
        <BoxOne> 
          <div className="container">
           {this.state.storedList.map(item => (
             <div key={item.value}  className="row" >
              <div className="col-lg-10 col-md-8 col-sm-12">
                <p>{item.value}</p>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12">
              <SearchBtn
                style={{ float:"left", marginLeft: 10 }} 
                style={{ marginBottom: 10, backgroundColor: "white", color: "blue" }}
                onClick={()=>this.checkItem(item.value)}>
                {item.checked === false ? (<div style={{height:20, width:15}}></div>):(<i className="fas fa-check"></i>)}    
              </SearchBtn>
              </div>

             </div>
         
           ))} 
           </div>
        </BoxOne>

      </div>
    );
  }
}

export default CheckList;