import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    document.title ='Fakestagram - My Feed';
    return(
        <div>
            <h1>Feed - Main Page</h1>
            
            <Link to ="/feed/profile">
                <button type="button">
                    Search Profiles
                </button>
            </Link>

            <Link to ="/" >
                <button type= "button">
                    Logout
                </button>
            </Link>
        </div>
);

};

export default MainPage;