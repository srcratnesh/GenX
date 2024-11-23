import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import Dashboard from './Dashboard';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        background: 'purple.800', // Set default background for the body
      },
    },
  },
});

const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Dashboard />
  </ChakraProvider>
);

export default App;
