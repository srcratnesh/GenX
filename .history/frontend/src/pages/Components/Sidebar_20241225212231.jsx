import React from 'react';
import { Box, VStack, Icon, Text, Flex, Switch, useColorMode, useColorModeValue, Divider } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaDiscord, FaRocket } from 'react-icons/fa';
import { MdOutlineLabel } from 'react-icons/md';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'; // Sun and moon icons
import { RiAwardFill, RiUser3Fill } from 'react-icons/ri'; // Custom reward and profile icons

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Fix: Destructure `useColorMode` to get `toggleColorMode`
  const bg = useColorModeValue("white", "black");
  const cardBg = useColorModeValue("white", "black");
  const buttonBg = useColorModeValue("white", "black");

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout functionality (e.g., clearing user data or token)
    // Then navigate to home page
    navigate('/');
  };

  return (
    <Box
      display="flex"
      height="100vh"
      bg={bg}
      color={useColorModeValue("black", "white")}
      flexDirection="column"
      fontWeight="bold"
    >
      <Box width="250px" bg={cardBg} p="4" borderRight="1px solid" borderColor={useColorModeValue("gray.300", "gray.600")} display="flex" flexDirection="column" justifyContent="space-between">
        {/* Brand Logo */}
        <Box mb="6">
          <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue("purple.500", "purple.300")}>
            GenX
          </Text>
        </Box>
        <Text>MENU</Text>

        {/* Menu Items */}
        <VStack spacing="2" align="stretch" flex="1">
          {/* Overview */}
          <Link to="/dashboard">
            <Box
              p="3"
              borderRadius="md"
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("gray.300", "gray.600"), boxShadow: "lg" }}
              display="flex"
              alignItems="center"
              cursor="pointer"
              width="100%"
            >
              <Icon as={RiAwardFill} mr="3" />
              <Text fontSize="sm">Overview</Text>
            </Box>
          </Link>

          {/* Data Labeling */}
          <Link to="/data-labeling">
            <Box
              p="3"
              borderRadius="md"
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("gray.300", "gray.600"), boxShadow: "lg" }}
              display="flex"
              alignItems="center"
              cursor="pointer"
              width="100%"
            >
              <Icon as={MdOutlineLabel} mr="3" />
              <Text fontSize="sm">Data Labeling</Text>
            </Box>
          </Link>

          {/* Airdrops */}
          <Link to="/airdrops">
            <Box
              p="3"
              borderRadius="md"
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("gray.300", "gray.600"), boxShadow: "lg" }}
              display="flex"
              alignItems="center"
              cursor="pointer"
              width="100%"
            >
              <Icon as={FaRocket} mr="3" />
              <Text fontSize="sm">Airdrops</Text>
            </Box>
          </Link>

          {/* Rewards */}
          <Link to="/rewards">
            <Box
              p="3"
              borderRadius="md"
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("gray.300", "gray.600"), boxShadow: "lg" }}
              display="flex"
              alignItems="center"
              cursor="pointer"
              width="100%"
            >
              <Icon as={RiAwardFill} mr="3" />
              <Text fontSize="sm">Rewards</Text>
            </Box>
          </Link>

          {/* Profile */}
          <Link to="/profile">
            <Box
              p="3"
              borderRadius="md"
              bg={buttonBg}
              _hover={{ bg: useColorModeValue("gray.300", "gray.600"), boxShadow: "lg" }}
              display="flex"
              alignItems="center"
              cursor="pointer"
              width="100%"
            >
              <Icon as={RiUser3Fill} mr="3" />
              <Text fontSize="sm">Profile</Text>
            </Box>
          </Link>
        </VStack>

        {/* Divider between menu and follow us */}
        <Divider borderColor={useColorModeValue("gray.300", "gray.600")} />

        {/* Follow Us Section */}
        <Flex mt="4" direction="column" align="flex-start">
          <Text fontSize="sm" mb="2">FOLLOW US</Text>
          
          {/* Discord Link */}
          <Flex align="center" gap="3" mb="2">
            <Icon as={FaDiscord} w={5} h={5} cursor="pointer" />
            <Text fontSize="sm">Discord</Text>
          </Flex>
          
          {/* Twitter Link */}
          <Flex align="center" gap="3">
            <Box as="svg" xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 14 14" fill="none">
              <path d="M11.026 0H13.1727L8.48285 5.93059L14 14H9.67983L6.29632 9.10628L2.42427 14H0.276362L5.29249 7.65716L0 0H4.42953L7.48794 4.47358L11.026 0ZM10.2724 12.5785H11.4622L3.78349 1.3472H2.50688L10.2724 12.5785Z" fill="currentColor" />
            </Box>
            <Text fontSize="sm">Twitter</Text>
          </Flex>
        </Flex>

        {/* Light/Dark Mode Toggle Button */}
        <Flex mt="6" align="center" justify="space-between">
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            size="sm"
          />
          <Icon as={colorMode === 'dark' ? BsMoonFill : BsFillSunFill} w={3} h={3} />
        </Flex>

        {/* Logout Button */}
        <Flex
          mt="auto"
          align="center"
          p="3"
          borderRadius="md"
          bg={buttonBg}
          _hover={{ bg: useColorModeValue("gray.300", "gray.600"), boxShadow: "lg" }}
          cursor="pointer"
          onClick={handleLogout}
        >
          <Icon as={FiLogOut} mr="3" />
          <Text fontSize="sm">Logout</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
