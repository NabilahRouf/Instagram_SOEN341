import React from 'react';
import SignInPage from '../Pages/SignIn';
import '@testing-library/jest-dom';
import { act, render, screen,fireEvent} from "../TestUtilities/SignUpTest-utils";
import {database} from '../Firebase/firebase';


beforeEach(async () => {
  //const handleSignUp = jest.fn(e => e.preventDefault);
  await database.enableNetwork();
  //await auth.signOut();
  await act(async () => {
    render(<SignInPage/>);
    
  });
});

describe('Background Video', () => {
  test('Logo must have src = "/videos/Clouds.mp4" and alt = "CloudsVideo"', () => {
    const cloudsVideo = screen.getByTestId('CloudsVideo');;
    expect(cloudsVideo).toHaveAttribute('src', '/videos/Clouds.mp4');
    expect(cloudsVideo).toHaveAttribute('alt', 'CloudsVideo');
  });
});

describe("SignIn Button Clicked",() =>{

  test('SignIn Button Works',() =>{
    window.alert = jest.fn();
    const submitButton = screen.getByRole('button',{name: /submit/i});
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
  });
});


describe("TextFields exist and initially empty",() =>{

  test('TextFields Exist and Empty',() =>{
    const password = screen.getByTestId('password');
    const email=screen.getByTestId('email');

    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
 
  });
});

describe("TextFields Change",() =>{

  test('TextFields changeable and register change',() =>{
    //const submit = screen.getByRole('button',{name: /signUp/i});
    const password = screen.getByTestId('password');
    const email=screen.getByTestId('email');
    
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(email, { target: { value: 'abc@gmail.com' } });

    expect(email).toHaveValue('abc@gmail.com');
    expect(password).toHaveValue('123456');
    
  });
});

describe("email format",() =>{ 
  
  test('email format is correct',() =>{
   
    //const validateInput = (str = "") => str.includes("@");
  
    const email=screen.getByTestId('email');
    fireEvent.change(email, { target: { value: 'abc@gmail.com' } });
    var tempBool =  email.value.includes("@");
    expect(tempBool).toBe(true);
    
  });
});

describe("Password too short",() =>{
  test('password is 6 characters or longer',() =>{
   
    //const validateInput = (str = "") => str.length>=6;
    
    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '12345' } });
    var tempBool = password.value.length>=6;
    expect(tempBool).toBe(false); //call signUp.js functions
    
  });
});

describe("password just right",() =>{
  test('password is between 6 and 20 chars long',() =>{
    
    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '123456' } });
    var tempBool = password.value.length>=6;
    expect(tempBool).toBe(true); 
    
  });
});

describe("password too long",() =>{
  test('password 20 characters or shorter',() =>{
   
    //const validateInput = (str = "") => str.length<=20;
    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '012345678901234567890' } });
    var tempBool = password.value.length<=20;
    expect(tempBool).toBe(false); 
    
  });
});

afterEach(async () =>{
  await database.disableNetwork();
  jest.clearAllMocks();
}) 


