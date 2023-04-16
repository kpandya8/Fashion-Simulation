import React from "react";
import { createRoot } from "react-dom";
import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./LandingPage";

const root = document.getElementById("root");
createRoot(root).render(
  <ChakraProvider>
    <LandingPage />
  </ChakraProvider>
);
