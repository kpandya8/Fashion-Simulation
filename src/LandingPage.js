import React, { useState } from "react"
import App from "./App"
import About from "./About"
import { Box, Button } from "@chakra-ui/react"

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState("app")

  const switchPage = () => {
    setCurrentPage(currentPage === "app" ? "about" : "app")
  }

  return (
    <Box>
      {currentPage === "app" && <App />}
      {currentPage === "about" && <About />}
      <Button onClick={switchPage} colorScheme="blue">
        Switch Page
      </Button>
    </Box>
  )
}

export default LandingPage
