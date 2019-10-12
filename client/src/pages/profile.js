import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/jumbotron";
import { Container, BoxOne } from "../components/grid";
import SavedCards from "../components/savedCard"
import Nav from "../components/navbar"

class Saved extends Component {
  state = {
    books: [],
    search: false,
    saved: true
  };

  componentDidMount() {
    this.loadSavedBooks();
  }

  loadSavedBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data});
        console.log(this.state.books);
      })
      .catch(err => console.log(err));
  };

    
    deleteABook = id => {
      API.deleteBook(id)
      .then(res => {console.log(res);
        this.loadSavedBooks()})
      .catch(err => console.log(err));
  };



  render() {
    return (
      <div>
      <Nav 
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
     </Container>
     </div>
    );
  }
}

export default Saved;