import React from 'react';
import { Link } from 'react-router-dom';
import {auth} from "../firebase"
import UploadedForm from '../Components/UploadedForm';


const MainPage =() =>{

    document.title ='Fakestagram - My Feed';  
        
    return(
        <div>
            <h1>Feed - Main Page</h1>
            <div>
            <Link to ="/profile">
                <button type="button">
                    Search Profiles
                </button>
            </Link>

            <button type="button" onClick={() => auth.signOut()}>
                   LogOut
                    
             </button>
            </div>
            <div>
                <UploadedForm/>
            </div>
            
        </div>
);

};

export default MainPage;