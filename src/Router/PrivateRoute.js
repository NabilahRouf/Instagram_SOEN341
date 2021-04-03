import React,{useContext} from "react";
import {Route,Redirect} from "react-router-dom";
import  { AuthenticationContext } from '../Firebase/Authenticated';

const PrivateRoute =({component: RouteComponent, ...rest}) =>{
    const{user} = useContext(AuthenticationContext);
    if(user) console.log("is user");
    else console.log("Not user");
    return(
    <Route
      {...rest}
      render={() =>
         !!user ?  <RouteComponent/>: <Redirect to={"/"} />}/>
    );
};

export default PrivateRoute