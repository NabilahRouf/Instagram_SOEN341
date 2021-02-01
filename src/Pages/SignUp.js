import React from 'react';
import {Link} from 'react-router-dom';


const SignUpPage = () => {
    document.title ='Fakestagram - Sign Up';
    return(
        <div>
            <h1>SignUp</h1>
            <Link to ="/feed">
                <button type="button">Confirm</button>
            </Link>
            <Link to ="/">
                <button type="button">Cancel</button>
            </Link>
        </div>
    );

};

export default SignUpPage;