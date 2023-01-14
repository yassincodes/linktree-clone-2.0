import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { DataContextProvider } from "./contexts/dataContext";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthContextProvider>
      <DataContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </Router>
);
