import React, { Component } from "react";
import API from "../utils/API";
import Navbar from "../components/Navbar";

import Jumbotron from "../components/Jumbotron";
import RecipeCard from "../components/RecipeCard";

import { Container, Box, BoxOne } from "../components/Grid";



class Profile extends Component {
  //   state = {
  //     books: [],
  //     search: false,
  //     saved: true
  //   };

  componentDidMount() {
    // this.loadSavedBooks();
  }

  //   loadSavedBooks = () => {
  //     API.getBooks()
  //       .then(res => {
  //         this.setState({ books: res.data});
  //         console.log(this.state.books);
  //       })
  //       .catch(err => console.log(err));
  //   };


  deleteABook = id => {
    API.deleteBook(id)
      .then(res => {
        console.log(res);
        this.loadSavedBooks()
      })
      .catch(err => console.log(err));
  };



  render() {
    return (
      <div>
        <Navbar></Navbar>
        {/* <Jumbotron>
          <h1>Chef Helper</h1>
          <p>..........................</p>
        </Jumbotron> */}

        <BoxOne>
          {/* {this.state.friends.map(friend => ( */}
          <RecipeCard

          // removeFriend={this.removeFriend}
          // id={friend.id}
          // key={friend.id}
          // name={friend.name}
          // image={friend.image}
          // occupation={friend.occupation}
          // location={friend.location}

          />
          {/* ))} */}
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

export default Profile;