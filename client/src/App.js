import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./pages/profile"
import Account from "./pages/account"
import CheckList from "./pages/other"


function App() {
  return (
   

    <Router>
      <div>
        {/* <LoginNavbar/>
        <Route exact path="/" component={Landing} /> */}
        <Route exact path="/" component={Home} /> 
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/checklist/:id" component={CheckList} />
        


       
      </div>
    </Router>
  );
}

export default App;
