import React from 'react';
import './Error.css';

const ErrorPage = () => {
    document.title ='Stratus - Error 404';
    return(
        
        <div >
            <img alt="404Logo" className = "dino_Layout" src="/images/dino.png"/>        
        </div>
    );

};

export default ErrorPage;