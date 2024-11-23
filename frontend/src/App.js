import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import Levels from './pages/Levels';
import Sidebar from './pages/Components/Sidebar'; // Import Sidebar
import { useState } from 'react';
import { Box, Flex, ChakraProvider, extendTheme } from '@chakra-ui/react';

// Extend theme to support light/dark mode globally
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function App() {
  const [user, setUser] = useState(null); // State to manage the user
  const [colorMode, setColorMode] = useState('light'); // State to manage theme

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {/* Pages without Sidebar */}
          <Route path="/signin" element={<SignInPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Pages with Sidebar */}
          <Route
            path="/dashboard"
            element={
              <Flex>
                <Sidebar colorMode={colorMode} toggleColorMode={toggleColorMode} />
                <Box flex="1">
                  <Dashboard user={user} colorMode={colorMode} />
                </Box>
              </Flex>
            }
          />
          <Route
            path="/help"
            element={
              <Flex>
                <Sidebar colorMode={colorMode} toggleColorMode={toggleColorMode} />
                <Box flex="1">
                  <Help />
                </Box>
              </Flex>
            }
          />
          <Route
            path="/settings"
            element={
              <Flex>
                <Sidebar colorMode={colorMode} toggleColorMode={toggleColorMode} />
                <Box flex="1">
                  <Settings />
                </Box>
              </Flex>
            }
          />
          <Route
            path="/profile"
            element={
              <Flex>
                <Sidebar colorMode={colorMode} toggleColorMode={toggleColorMode} />
                <Box flex="1">
                  <Profile />
                </Box>
              </Flex>
            }
          />
          <Route
            path="/rewards"
            element={
              <Flex>
                <Sidebar colorMode={colorMode} toggleColorMode={toggleColorMode} />
                <Box flex="1">
                  <Rewards />
                </Box>
              </Flex>
            }
          />
          <Route
            path="/levels"
            element={
              <Flex>
                <Sidebar colorMode={colorMode} toggleColorMode={toggleColorMode} />
                <Box flex="1">
                  <Levels />
                </Box>
              </Flex>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
