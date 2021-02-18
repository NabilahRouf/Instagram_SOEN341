import React,{useCallback,useContext} from 'react';
import {Redirect} from "react-router";
import {auth,database} from '../firebase';
import SignUpBox from '../Components/SignUpBox';
import {AuthenticationContext} from "../Authenticated";

const SignUpPage =()=> {
    document.title ='Fakestagram - Sign Up';
    const handleSignUp = useCallback(async event => {
    
    event.preventDefault();
    const{username,email,password} = event.target.elements;
    console.log(username.value,email.value,password.value);
    var newUsername=true;

    await database.collection('users').where('username','==',username.value).get('value').then((snapshot) =>{
    
            if(snapshot.empty){
                newUsername=true;
            }
            else{
                newUsername=false;
                console.log(newUsername +"line 23");
                throw new Error('Username is not unique: Try again!');
            }

        }).catch((error)=>alert(error.message));  
        
        if(newUsername===true){
            console.log(newUsername+"line 30");
        await auth.createUserWithEmailAndPassword(email.value,password.value).then((authenticatedUser) =>  {
            database.collection('users').doc(authenticatedUser.user.uid).set({
                followersCount:0,
                //followers: [],
                //following:[],
                followingCount:0,
                //myPosts:[],
                uid:authenticatedUser.user.uid,
                username: username.value,
            
             });

            return authenticatedUser.user.updateProfile({
            displayName: username.value
            })
        }).catch((error)=>alert(error.message));
    }


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

export default SignUpPage;