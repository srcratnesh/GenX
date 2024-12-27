// src/pages/Rewards.js
import React from 'react';
import { Box, Heading, Text, List, ListItem, Badge } from '@chakra-ui/react';

const Rewards = () => {
  return (
    <Box p="4">
      <Heading mb="4">Rewards</Heading>
      <Text>Track your rewards and achievements here.</Text>
      <List spacing="3" mt="4">
        <ListItem>
          <Badge colorScheme="green" mr="2">Achievement</Badge>
          100 Points earned
        </ListItem>
        <ListItem>
          <Badge colorScheme="purple" mr="2">Milestone</Badge>
          Completed 10 tasks
        </ListItem>
      </List>
    </Box>
  );
};

export default Rewards;
