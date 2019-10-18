import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
//import Profile from "./pages/profile";
import Landing from "./components/Landing"
import LoginNavbar from "./components/LoginNavbar"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./pages/profile"


function App() {
  return (
    // <Router>
    // //   <div>
    // //     <Switch>
    // //       <Route exact path="/" component={Home} />
    // //       <Route exact path="/home" component={Home} />
    // //       <Route exact path="/profile" component={Profile} /> 
    // //     </Switch>
    // //   </div>
    //  </Router>

    <Router>
      <div className="App">
        {/* <LoginNavbar/>
        <Route exact path="/" component={Landing} /> */}
        <Route exact path="/" component={Home} />
        <div classname="container">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        </div>
        


       
      </div>
    </Router>
  );
}

export default App;
