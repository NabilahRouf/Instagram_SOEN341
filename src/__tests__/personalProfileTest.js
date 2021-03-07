import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import PersonalProfilePage from '../Pages/PersonalProfile';
import ImageGrid from '../Components/ImageGrid';
import { act, render, screen,fireEvent,cleanup} from "../test-utils";
import Menu from '../Components/Menu';
import { getByText } from '@testing-library/react';

beforeEach(async () => {
  const setSelectedImg = jest.fn();
  await act(async () => {
    render(<ImageGrid setSelectedImg ={setSelectedImg} profile ={"12345"}/>);
    render(<PersonalProfilePage/>);
  });
});

describe('Stratus Logo', () => {
  test('Logo must have src = "/images/logo4.png" and alt = "stratusLogo"', () => {
    const stratusLogo = screen.getByAltText('stratusLogoHeaderProfile');
    expect(stratusLogo).toHaveAttribute('src', '/images/logo4.png');
    expect(stratusLogo).toHaveAttribute('alt', 'stratusLogoHeaderProfile');
  });
});

describe("Header Home Icon Clicked",() =>{

  test('Home Button Works',async() =>{
    const homeIcon = screen.getByRole('button',{name: /homeButtonHeaderProfile/i});
    expect(homeIcon).toBeInTheDocument();
    fireEvent.click(homeIcon);
  });
});

test("displays user", () => {
  expect(screen.getByText(/Followers:/i)).toBeInTheDocument();
  expect(screen.getByText(/Following:/i)).toBeInTheDocument();
  expect(screen.getByText(/0/i)).toBeInTheDocument();

});


describe("Menu Click", () => {

  afterEach(cleanup);
  test("renders menu button(Account Circle), then we try to click it", async () => {
    const button = screen.getByRole('button',{name: "accountCircle"});
    fireEvent.click(button);
    const menuItem = screen.getByRole("menu");
    expect(getByText(menuItem, "My Profile")).toBeTruthy();
    expect(getByText(menuItem, "Logout")).toBeTruthy();
  });
});
