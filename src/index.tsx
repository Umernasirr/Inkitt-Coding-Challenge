import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Colors } from './helper/theme';

const colors = {
  brand: {
    900: Colors.primaryColor900,
    600: Colors.primaryColor600,

  },
  background: {
    600: Colors.backgroundColor600,
  }
}

const theme = extendTheme({
  colors,
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
