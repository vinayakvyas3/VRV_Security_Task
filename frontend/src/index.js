import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

// Create an authentication context
export const AuthContext = createContext();

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user authentication
  const handleSignIn = () => {
    // Perform authentication logic
    setIsAuthenticated(true);
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated, handleSignIn }}>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <App />
              </PrivateRoute>
            } />
           
          </Routes>
          <App></App>
        </AuthContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// PrivateRoute component to handle authentication
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
