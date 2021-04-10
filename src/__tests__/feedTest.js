import React from 'react';
import { act, render, screen,fireEvent} from "../TestUtilities/test-utils";
import MainPage from '../Pages/Feed';
import {database} from '../Firebase/firebase';
import { getByText } from '@testing-library/react';
import '@testing-library/jest-dom';


beforeEach(async () => {
  await database.enableNetwork();
  await act(async () => {
    render(<MainPage/>);
  });
});

describe('Stratus Logo', () => {
  test('Logo must have src = "/images/logo4.png" and alt = "stratusLogo"', () => {
    const stratusLogo = screen.getByAltText('stratusLogoHeader');
    expect(stratusLogo).toHaveAttribute('src', '/images/logo4.png');
    expect(stratusLogo).toHaveAttribute('alt', 'stratusLogoHeader');
  });
});

describe("Header Home Icon Clicked",() =>{

  test('Home Button Works',() =>{
    const homeIcon = screen.getByRole('button',{name: /homeButtonHeader/i});
    expect(homeIcon).toBeInTheDocument();
    fireEvent.click(homeIcon);
  });
});


describe("Menu Click", () => {

  test("renders menu button(Account Circle), then we try to click it",  () => {
    const button = screen.getByRole('button',{name: "accountCircle"});
    fireEvent.click(button);
    const menuItem = screen.getByRole("menu");
    expect(getByText(menuItem, "My Profile")).toBeTruthy();
    expect(getByText(menuItem, "Logout")).toBeTruthy();
  });
});

describe("Search bar", () => {

  //afterEach(cleanup);
  test("renders search, then we try to click it",  () => {
    const searchBar = screen.getByRole('textbox',{name: /Search Profile/i})
    fireEvent.change(searchBar, { target: { value: 'test' } });
    expect(searchBar).toHaveValue('test');
  });

});

afterEach(async () =>{
  await database.disableNetwork();
  jest.clearAllMocks();
})