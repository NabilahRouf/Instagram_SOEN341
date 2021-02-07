import React from 'react';
import { Link } from 'react-router-dom';
import fire from '../firebase.js';

const MainPage =() =>{

    
    document.title ='Fakestagram - My Feed';

      
    return(
        <div>
            <h1>Feed - Main Page</h1>
            
            <Link to ="/profile">
                <button type="button">
                    Search Profiles
                </button>
            </Link>

            <button type="button" onClick={() => fire.auth().signOut()}>
                   LogOut
                    
             </button>

            
        </div>
);

};

export default MainPage;