import React from 'react';
import FeedPage from '../Pages/Feed';
import ImageGrid from '../Components/ImageGrid';
import { act, render, screen,fireEvent} from "../test-utils";
import { getByText } from '@testing-library/react';
import {database} from '../firebase';

// Start
beforeEach(async () => {
  await database.enableNetwork();
  await act(async () => {
    render(<FeedPage/>);
  });
});
// First Item to describe is the logo, on the top left of the screen. 
describe('Stratus Logo', () => {
  test('Logo must have src = "/images/logo4.png" and alt = "stratusLogo"', () => {
    const stratusLogo = screen.getByAltText('stratusLogoHeaderProfile');
    expect(stratusLogo).toHaveAttribute('src', '/images/logo4.png');
    expect(stratusLogo).toHaveAttribute('alt', 'stratusLogoHeaderProfile');
  });
});
// Search bar clicked 
// Main Page Icon Clicked 
describe("Header Home Icon Clicked",() =>{
  test('Home Button Works',() =>{
    const homeIcon = screen.getByRole('button',{name: /homeButtonHeaderProfile/i});
    expect(homeIcon).toBeInTheDocument();
    fireEvent.click(homeIcon);
  });
});
// Profile Icon clicked 
describe("Profile Click", () => {
  test("renders menu button(Account Circle), then we try to click it",  () => {
    const Profilebutton = screen.getByRole('button',{name: "accountCircle"});
    fireEvent.click(Profilebutton);
    const menuItem = screen.getByRole("menu");
    expect(getByText(menuItem, "My Profile")).toBeTruthy();
    expect(getByText(menuItem, "Logout")).toBeTruthy();
  });
});
// Posts show up 
// Comments show up 
// END
afterEach(async () =>{
    await database.disableNetwork();
    jest.clearAllMocks();
})