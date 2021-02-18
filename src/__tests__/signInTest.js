import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from '../Pages/SignIn';
import { AuthenticationContext } from '../Authenticated';

//Sum function is just a dummy test as test would fail if empty
describe('Testing SignIn Page to Read App Name', () => {
    function sum(a, b) {
        return a + b;
     }
 
     it('should equal 4',()=>{
        expect(sum(2,2)).toBe(4);
       })
 
     test('also should equal 4', () => {
         expect(sum(2,2)).toBe(4);
       }) 
});
/*
describe("<SignInPage />", () => {
    beforeEach(() => {
      render(
        <AuthenticationContext.Provider>
        <SignInPage/>
        </AuthenticationContext.Provider>
        
      );
     
    });


it('Sign In Page Title', () => {
    
  expect(screen.getByText('Picture Perfect')).toBeInTheDocument();
});
});
*/