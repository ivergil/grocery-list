import React, { Component } from "react";
import API from "../utils/API";
import { Container, Box, BoxOne } from "../components/Grid";

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


  // deleteABook = id => {
  //   API.deleteBook(id)
  //     .then(res => {
  //       console.log(res);
  //       this.loadSavedBooks()
  //     })
  //     .catch(err => console.log(err));
  // };



  render() {
    return (
      <div>

        <h2>Your CheckList:</h2>
       
        <BoxOne> 
          <div>
           {this.state.storedList.map(item => (
             <div key={item.value}>
              <p>{item.value}</p>
             </div>
         
           ))} 
           </div>
        </BoxOne>

        {/* <Nav 
       search = {this.state.search} 
       saved = {this.state.saved}/>
      <Container fluid>
     <Jumbotron>
      <h1>(React) Google Book Search</h1>
      <p>Search for and Save Books of your Interest</p>
     </Jumbotron>

      <BoxOne>
      <h4 className="mb-4">Saved Books</h4>
     {this.state.books.map(book => (
            <SavedCards
              id={book._id}
              key={book._id} 
              title ={book.title}
              bookId = {book.bookId}
              deleteABook = {this.deleteABook}
              authors = {book.authors[0]}
              image = {book.image}
              link ={book.link}
              description = {book.description}
             />
     ))}

      </BoxOne>
     </Container> */}
      </div>
    );
  }
}

export default CheckList;