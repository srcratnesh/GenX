import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Link,
  Divider,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import videoBg from './assets/Black myth_ WUKONG wallpaper (4K video).mp4';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('/api/auth/register', { fullName, email, password });
      const { userId, token } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      console.log('User ID and token saved:', userId, token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(135deg, purple.800, purple.700)"
    >
      {/* Video Background */}
      <Box
        as="video"
        src={videoBg}
        autoPlay
        loop
        muted
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex="-1"
        filter="hue-rotate(310deg) brightness(0.6)"
      />

      {/* Register Box */}
      <Box
        bgGradient="linear(to-br, rgba(128, 90, 213, 0.8), rgba(255, 192, 193, 0.7), rgba(255, 223, 0, 0.7), rgba(107, 70, 193, 0.8))"
        p="8"
        color="white"
        borderRadius="lg"
        width={{ base: '90%', sm: '80%', md: '40%' }}
        textAlign="center"
        boxShadow="0 0 30px 10px rgba(0, 0, 0, 0.8)"
      >
        <Heading as="h1" size="2xl" mb="4" color="yellow.300">
          Register
        </Heading>
        <Text mb="4" color="white">
          Already have an account?{' '}
          <Link as={RouterLink} to="/signin" color="purple.700" fontWeight="bold">
            Sign In
          </Link>
        </Text>

        {errorMessage && (
          <Text color="red.500" mb="4">
            {errorMessage}
          </Text>
        )}

        <FormControl mb="4" isRequired>
          <FormLabel color="white">Full Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaUser color="gray" aria-label="full-name-icon" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-label="full-name-input"
              bg="whiteAlpha.800"
              focusBorderColor="yellow.400"
            />
          </InputGroup>
        </FormControl>

        <FormControl mb="4" isRequired>
  <FormLabel color="white">Email</FormLabel>
  <InputGroup>
    <InputLeftElement pointerEvents="none">
      <FaEnvelope color="gray" aria-label="email-icon" />
    </InputLeftElement>
    <Input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      aria-label="email-input"
      bg="whiteAlpha.800"
      color="black" // Ensures the input text is black
      fontWeight="bold" // Makes the input text bold
      focusBorderColor="red.400"
    />
  </InputGroup>
</FormControl>


        <FormControl mb="4" isRequired>
          <FormLabel color="white">Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaLock color="gray" aria-label="password-icon" />
            </InputLeftElement>
            <Input
              type={showPassword ? 'text' : 'password'} // Toggles between text and password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="password-input"
              bg="whiteAlpha.800"
              focusBorderColor="yellow.400"
            />
            <InputRightElement>
              <Button
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                color="bla.300"
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          width="100%"
          colorScheme="yellow"
          size="lg"
          mb="6"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : 'CREATE MY ACCOUNT'}
        </Button>

        <Divider />

        <Flex mt="4" justifyContent="space-between" width="100%">
          <Link color="gray.300">Privacy Policy</Link>
          <Link color="gray.300">Terms & Conditions</Link>
        </Flex>

        <Text mt="4" color="gray.300" fontSize="sm">
          © GenX Foundation, 2024. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
