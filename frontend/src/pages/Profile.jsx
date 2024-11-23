// src/pages/Profile.js
import React from 'react';
import { Box, Heading, Text, Avatar } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Box p="4">
      <Heading mb="4">Profile</Heading>
      <Avatar size="xl" name="User Name" mb="4" />
      <Text>Name: User Name</Text>
      <Text>Email: user@example.com</Text>
      <Text>Account created: January 1, 2023</Text>
    </Box>
  );
};

export default Profile;
