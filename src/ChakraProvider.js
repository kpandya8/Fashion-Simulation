import * as React from "react"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  // Customize your theme here (optional)
})

export function Chakra({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
