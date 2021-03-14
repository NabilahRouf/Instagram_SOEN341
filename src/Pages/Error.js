import React from 'react';
import './Error.css';

const ErrorPage = () => {
    document.title ='Stratus - Error 404';
    return(
        
        <div >
            <img alt="404Logo" className = "errorLayout" src="/images/dino.png"/>        
        </div>
    );

};

export default ErrorPage;