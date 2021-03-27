import React from 'react';
import SignUpBox from '../Components/SignUpBox';
import { act, render, screen,fireEvent} from "../SignUpTest-utils";
import { getByText } from '@testing-library/react';
import {auth,database} from '../firebase';
import SignUpPage from '../Pages/SignUp';
import handleSignUp from '../Pages/SignUp'

beforeEach(async () => {
  //const handleSignUp = jest.fn(e => e.preventDefault);
  await database.enableNetwork();
  //await auth.signOut();
  await act(async () => {
    //render(<SignUpBox handleSignUp ={handleSignUp}/>);
    render(<SignUpPage/>);

    
  });
});

describe('Background Video', () => {
  test('Logo must have src = "/videos/Clouds.mp4" and alt = "CloudsVideo"', () => {
    const cloudsVideo = screen.getByTestId('CloudsVideo');;
    expect(cloudsVideo).toHaveAttribute('src', '/videos/Clouds.mp4');
    expect(cloudsVideo).toHaveAttribute('alt', 'CloudsVideo');
  });
});

describe("SignUp Button Clicked",() =>{

  test('SignUp Button Works',() =>{
    window.alert = jest.fn();
    const submitButton = screen.getByRole('button',{name: /signUp/i});
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
  });
});


describe("TextFields exist and initially empty",() =>{

  test('TextFields Exist and Empty',() =>{
    const password = screen.getByTestId('password');
    const email=screen.getByTestId('email');
    const username=screen.getByTestId('username');

    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(username).toBeInTheDocument();

    expect(email).toHaveValue('');
    expect(username).toHaveValue('');
    expect(password).toHaveValue('');
 
  });
});

describe("TextFields Change",() =>{

  test('TextFields changeable and register change',() =>{
    //const submit = screen.getByRole('button',{name: /signUp/i});
    const password = screen.getByTestId('password');
    const email=screen.getByTestId('email');
    
    const username=screen.getByTestId('username');
    fireEvent.change(username, { target: { value: 'abc' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(email, { target: { value: 'abc@gmail.com' } });

    expect(email).toHaveValue('abc@gmail.com');
    expect(username).toHaveValue('abc');
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


