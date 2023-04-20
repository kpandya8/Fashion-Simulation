import React, { useState } from "react";
import App from "./App";
import About from "./About";
import { ChakraProvider, Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Button, Text } from "@chakra-ui/react";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState("app");

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  const redirectToExternalLink = () => {
    window.open("https://www.example.com", "_blank");
  };

  return (
    <ChakraProvider>
      <Flex
        w="100%"
        h="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="20%" h="60%">
         
          {currentPage === "app" && <App />}
          {currentPage === "about" && <About />}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default LandingPage;
