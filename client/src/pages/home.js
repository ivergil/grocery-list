import React, { Component } from "react";
import API from "../utils/API";
import { Container, Box, BoxOne } from "../components/Grid";
import {Input,SearchBtn} from "../components/SearchBox";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import GroceryCard from "../components/GroceryCard"
import RecipeCard from "../components/RecipeCard"




class Home extends Component {
  state = {
    listOfResults: [],
    title: "chicken",

    // Home: true,
    // saved: false
  };

  componentDidMount() {
    this.getRecipesIds();
  }


getRecipesIds = () => {
  API.spoonacularId(this.state.title)
    .then(res => {
       console.log(this.state.title);
      this.setState({ listOfResults:res.data.results });
       console.log(this.state.listOfResults);
    })
    .catch(err => console.log(err));
}


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.title)
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getRecipesIds(this.state.title);
   
  };

//   saveABook = (bookQuery) => {
//       API.saveBook(bookQuery)
//         .then(res => {console.log(res); this.loadBooks()})
//         .catch(err => console.log(err));
//   }

  render() {
    return (
      <div>

          <Navbar></Navbar>

          <Container fluid>   
          <Jumbotron>
              <h1>Chef Helper</h1>
              <p>..........................</p>
          </Jumbotron>
               
          <Box>
            <h4 className="mb-4" >Search Recipes</h4>
            <p>Key Word:</p>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Chicken Teriyaki">
          </Input>
          <SearchBtn
            onClick={this.handleSubmit}>
            Search
          </SearchBtn>
         </Box>
        <BoxOne>
        <h4 className="mb-4"> Results</h4>
        {this.state.listOfResults.map(recipe => (

            <RecipeCard
              id={recipe.id}
              key={recipe.id}
              //saveABook = {this.saveABook}
              recipeTitle={recipe.title}
              //authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
              image={recipe.image}
              servings={recipe.servings}
              readyInMinutes={recipe.readyInMinutes}/>
           
            
))}

        </BoxOne>

        <BoxOne>
        <h4 className="mb-4"> Grocery Calculator</h4>
        <GroceryCard/>
        </BoxOne>

        <BoxOne>
        <h4 className="mb-4"> Coupons</h4>
        
        </BoxOne>

        

         </Container>
      {/* <Nav
      Home = {this.state.Home} 
      saved = {this.state.saved}/>
      <Container fluid>
     <Jumbotron>
      <h1>(React) Google Book Home</h1>
      <p>Home for and Save Books of your Interest</p>
     </Jumbotron>
     <Box>
     <h4 className="mb-4" >Book Home</h4>
       <p>Title:</p>
     <Input
       value={this.state.title}
       onChange={this.handleInputChange}
       name="title"
       placeholder="Title">
       </Input>
     <HomeBtn
     onClick={this.handleSubmit}>
       Home
     </HomeBtn>
     </Box>


     <BoxOne>
     <h4 className="mb-4"> Results</h4>
     {this.state.books.map(book => (

            <Cards
              id={book.id}
              key={book.id}
              saveABook = {this.saveABook}
              bookTitle={book.volumeInfo.title}
              authors={book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "No Available Author"}
              image={book.volumeInfo.imageLinks.thumbnail}
              description={book.volumeInfo.description}
              link={book.volumeInfo.infoLink}/>


     ))}



      <p className="text-right"><a  href="https://github.com/ginnac/google-books-Home"> <p className="atag">Find GitHub Repository Here</p></a></p>
     </BoxOne>

     </Container> */}
      </div>
     
    );
  }
}

export default Home;