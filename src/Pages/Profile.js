import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    document.title ='Fakestagram - Profiles';
    return(
        <div>
            <h1>Users Page</h1>
            <Link to = "/feed">
                <button type = "button">
                    Feed
                </button>
            </Link>
        </div>
    );

};

export default ProfilePage;