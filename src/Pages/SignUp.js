import React,{useCallback,useContext} from 'react';
import {withRouter,Redirect} from "react-router";
import fire from '../firebase';
import SignUpBox from '../Components/SignUpBox';
import {AuthenticationContext} from "../Authenticated";

const SignUpPage =()=> {
    document.title ='Fakestagram - Sign Up';

    const handleSignUp = useCallback(async event => {

    console.log("entered handleSignUp");    
    event.preventDefault();
    const{username,email,password} = event.target.elements;
    console.log(username.value,email.value,password.value);
        
    
         await fire.auth().createUserWithEmailAndPassword(email.value,password.value).then((authenticatedUser) =>  {
            return authenticatedUser.user.updateProfile({
            displayName: username.value
            })
        }).catch((error)=>alert(error.message));
        
    },[]);

    const{user} = useContext(AuthenticationContext);
    if(user){
        return <Redirect to ="/feed"/>;
    }

    return(     
      <>
       <SignUpBox  
        handleSignUp={handleSignUp}
        ></SignUpBox>
       </>
    
    );
    
};

export default withRouter(SignUpPage);