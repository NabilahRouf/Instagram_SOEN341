import React from 'react';
import ProfilePage from '../Pages/Profile';
import ImageGrid from '../Components/ImageGrid';
import { act, render, screen,fireEvent} from "../test-utils";
import {database} from '../firebase';


beforeEach(async () => {
  const setSelectedImg = jest.fn();
  await database.enableNetwork();
  await act(async () => {
    render(<ImageGrid setSelectedImg ={setSelectedImg} profile ={"12345"}/>);
    render(<ProfilePage/>);
  });
});


describe("Upload Button Clicked", () => {

  test("renders upload button(Upwards Arrow), then we try to click it",  () => {
    const button = screen.getByRole('button',{name: "uploadButtonHeader"});
    fireEvent.click(button);
    const caption = screen.getByTestId('caption');
    expect(caption).toBeInTheDocument();
    fireEvent.change(caption, { target: { value: 'abc' } });
    expect(caption).toHaveValue('abc');
  });


});


afterEach(async () =>{
  await database.disableNetwork();
  jest.clearAllMocks();
})


 
