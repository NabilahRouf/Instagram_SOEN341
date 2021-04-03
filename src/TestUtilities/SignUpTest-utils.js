import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthenticationContext} from '../Firebase/Authenticated';



const user = null;


const AllTheProviders = ({ children }) => {
  return (
    <Router>
      <AuthenticationContext.Provider value={{user}}>
        {children}
      </AuthenticationContext.Provider>
    </Router>
  );
};

const customRender = (ui, options) => {
  render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render };