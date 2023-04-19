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
        <Box w="80%" h="80%">
          <Flex p={4} justifyContent="space-between" alignItems="center">
          <Image src="../Soft_logo.png" alt="Logo" h="50px" />
          <Text>CSE 594: Final Project Demo (Spring 2023) </Text>
            <Menu>
              <MenuButton as={Button} colorScheme="gray">
                Menu
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => switchPage("app")}>App</MenuItem>
                <MenuItem onClick={() => switchPage("about")}>About</MenuItem>
                <MenuItem onClick={redirectToExternalLink}>User Research Survey</MenuItem>
              </MenuList>
            </Menu>
           
          </Flex>
          {currentPage === "app" && <App />}
          {currentPage === "about" && <About />}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default LandingPage;
