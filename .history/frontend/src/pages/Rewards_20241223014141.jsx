import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, List, ListItem, Badge, Button } from '@chakra-ui/react';
import axios from 'axios';

const Rewards = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');

  // Replace with the logged-in user's username (or fetch dynamically)
  const username = 'your-twitter-username'; 

  useEffect(() => {
    // Fetch follow status from the backend
    const checkFollowStatus = async () => {
      try {
        const response = await axios.get(`/api/twitter/is-following/${username}`);
        setIsFollowing(response.data.isFollowing);

        // Update button text based on follow status
        setButtonText(response.data.isFollowing ? 'Claim' : 'Follow');
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    checkFollowStatus();
  }, [username]);

  const handleButtonClick = async () => {
    if (!isFollowing) {
      // Redirect user to follow `prj_GenX` on Twitter
      window.open('https://twitter.com/prj_GenX', '_blank');
    } else {
      // Handle reward claim logic here
      alert('Reward claimed!');
    }
  };

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
      <Box mt="6">
        <Button colorScheme={isFollowing ? 'green' : 'blue'} onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default Rewards;
