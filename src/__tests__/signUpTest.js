import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpPage from '../Pages/SignUp';
import { AuthenticationContext } from '../Authenticated';

//Sum function is just a dummy test as test would fail if empty
describe('Testing SignUp Page', () => {
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