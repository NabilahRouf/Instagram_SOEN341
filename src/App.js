import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"; 
import MainPage from "./Pages/Feed";
import ErrorPage from "./Pages/Error";
import SignUpPage from "./Pages/SignUp";
import ProfilePage from "./Pages/Profile";
import SignInPage from "./Pages/SignIn";
import {AuthenticationProvider} from './Authenticated';
import PrivateRoute from './PrivateRoute.js';


const App = ()=>{
    return (
    <AuthenticationProvider>
      <Router>
        <Switch>
          <Route exact path = "/"  component ={SignInPage} />
          <Route exact path = "/signup"  component = {SignUpPage} />
          <PrivateRoute exact path = "/feed" component = {MainPage}/>
          <PrivateRoute exact path = "/profile" component = {ProfilePage}/>
          <Route exact path = "/error404" component = {ErrorPage} /> 
          <Redirect to = "/error404"/>
        </Switch>
      </Router>
    </AuthenticationProvider> 
    );
   
}
export default App;