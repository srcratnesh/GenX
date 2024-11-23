// src/pages/Levels.js
import React from 'react';
import { Box, Heading, Text, Progress, VStack } from '@chakra-ui/react';

const Levels = () => {
  return (
    <Box p="4">
      <Heading mb="4">Levels</Heading>
      <Text>Progress through different levels as you complete tasks and earn rewards.</Text>
      
      <VStack spacing="4" mt="4" align="start">
        <Box>
          <Text>Level 1: Beginner</Text>
          <Progress value={80} colorScheme="green" size="sm" />
        </Box>
        
        <Box>
          <Text>Level 2: Intermediate</Text>
          <Progress value={40} colorScheme="yellow" size="sm" />
        </Box>

        <Box>
          <Text>Level 3: Advanced</Text>
          <Progress value={20} colorScheme="red" size="sm" />
        </Box>
      </VStack>
    </Box>
  );
};

export default Levels;
