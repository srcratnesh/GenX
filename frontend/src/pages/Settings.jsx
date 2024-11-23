// src/pages/Settings.js
import React from 'react';
import { Box, Heading, Text, Switch, FormControl, FormLabel } from '@chakra-ui/react';

const Settings = () => {
  return (
    <Box p="4">
      <Heading mb="4">Settings</Heading>
      <Text>Customize your preferences here.</Text>
      
      <FormControl display="flex" alignItems="center" mt="4">
        <FormLabel htmlFor="notifications" mb="0">
          Enable Notifications
        </FormLabel>
        <Switch id="notifications" />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt="4">
        <FormLabel htmlFor="dark-mode" mb="0">
          Dark Mode
        </FormLabel>
        <Switch id="dark-mode" />
      </FormControl>
    </Box>
  );
};

export default Settings;
