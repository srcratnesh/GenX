import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, List, ListItem, Badge, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Rewards = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonText, setButtonText] = useState('Follow');
  const [points, setPoints] = useState(user.points || 0); // Initialize with user points
  const toast = useToast();

  // Function to check follow status and update points
  const checkFollowStatus = async () => {
    try {
      const response = await axios.get(`/api/twitter/follow-status/${user.username}`);
      
      if (response.data.isFollowing) {
        setIsFollowing(true);
        setButtonText('Claim');
      } else {
        setIsFollowing(false);
        setButtonText('Follow');
      }

      // Add points if follow confirmed
      if (response.data.pointsAdded > 0) {
        setPoints(prev => prev + response.data.pointsAdded);
        toast({
          title: 'Reward Earned!',
          description: `You earned ${response.data.pointsAdded} points for following prj_GenX.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error checking follow status:', error);
      toast({
        title: 'Error',
        description: 'There was an error checking your follow status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // useEffect to check follow status when the component mounts
  useEffect(() => {
    checkFollowStatus();
  }, [user.username]);

  // Handle button click based on follow status
  const handleButtonClick = () => {
    if (!isFollowing) {
      // Redirect user to the Twitter profile to follow
      window.open('https://twitter.com/prj_GenX', '_blank');
    } else {
      // Add more logic for claiming rewards if necessary
      toast({
        title: 'Reward Claimed!',
        description: `You successfully claimed your points.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="4">
      <Heading mb="4">Rewards</Heading>
      <Text>Track your rewards and achievements here.</Text>
      <List spacing="3" mt="4">
        <ListItem>
          <Badge colorScheme="green" mr="2">Achievement</Badge>
          {points} Points earned
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
