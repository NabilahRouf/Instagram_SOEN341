import React, {useState, useEffect, Component} from 'react'
import './App.css';
//import {database} from './firebase';
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"; 
import MainPage from "./Pages/Feed";
import ErrorPage from "./Pages/Error";
import SignUpPage from "./Pages/SignUp";
import ProfilePage from "./Pages/Profile";
import SignInPage from "./Pages/SignIn";


class App extends Component{
  render(){
    return ( 
    <Router>
      <Switch>
        <Route exact path = "/"  component = {SignInPage} />
        <Route exact path = "/signup" component = {SignUpPage} />
        <Route exact path = "/feed" component = {MainPage}/>
        <Route exact path = "/feed/profile" component = {ProfilePage}/>
        <Route exact path = "/error404" component = {ErrorPage} /> 
        <Redirect to = "/error404"/>
      </Switch>
    </Router>

    );
  }
}
export default App;
  
  //[posts,setPosts] = useState;
  //Runs a piece of code based on a specific condition
  //useEffect{() => {

  //database.collection(' ').onSnapshot(snapshot =>{

  //everytime change happens to collection run this code
  //setPosts(snapshot.docs.map(doc => ({
    //id: doc.id,
    //post: doc.data()

  //})));
//  })
  //},[]};

  //Pages

  
