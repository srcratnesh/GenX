import React from 'react';
import {
  Box,
  VStack,
  Icon,
  Text,
  Badge,
  Link,
  Divider,
  Button,
  Flex,
} from '@chakra-ui/react';
import {
  FiGrid,
  FiPackage,
  FiGift,
  FiBox,
  FiLogOut,
  FiArrowRight,
} from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';
import { MdOutlineLabel } from 'react-icons/md';

const Sidebar = () => {
  return (
    <Box display="flex" height="100vh" bg="#2C2A3D" color="white">
      <Box
        width="250px"
        bg="#3A3A52"
        p="5"
        borderRight="1px solid #4A4A6A"
      >
        {/* Brand Logo */}
        <Box mb="10">
          <Text fontSize="2xl" fontWeight="bold" color="#B794F4">
            genx™
          </Text>
        </Box>

        {/* Menu Items */}
        <VStack spacing="4" align="start">
          <Link href="/dashboard" _hover={{ textDecor: 'none' }}>
            <Flex align="center" p="2" borderRadius="md" _hover={{ bg: "#4A4A6A" }}>
              <Icon as={FiGrid} mr="2" />
              <Text>Dashboard</Text>
            </Flex>
          </Link>

          <Link href="/data-labeling" _hover={{ textDecor: 'none' }}>
            <Flex align="center" p="2" borderRadius="md" _hover={{ bg: "#4A4A6A" }}>
              <Icon as={MdOutlineLabel} mr="2" />
              <Text>Data Labeling</Text>
              <Badge ml="2" colorScheme="gray">Coming Soon</Badge>
            </Flex>
          </Link>

          <Link href="/referral-program" _hover={{ textDecor: 'none' }}>
            <Flex align="center" p="2" borderRadius="md" _hover={{ bg: "#4A4A6A" }}>
              <Icon as={FaRocket} mr="2" />
              <Text>Referral Program</Text>
            </Flex>
          </Link>

          <Link href="/rewards" _hover={{ textDecor: 'none' }}>
            <Flex align="center" p="2" borderRadius="md" _hover={{ bg: "#4A4A6A" }}>
              <Icon as={FiGift} mr="2" />
              <Text>Rewards</Text>
            </Flex>
          </Link>

          <Link href="/store" _hover={{ textDecor: 'none' }}>
            <Flex align="center" p="2" borderRadius="md" _hover={{ bg: "#4A4A6A" }}>
              <Icon as={FiBox} mr="2" />
              <Text>Store</Text>
              <Badge ml="2" colorScheme="green">New</Badge>
            </Flex>
          </Link>

          {/* Install Grass section */}
          <Box bg="#4A4A6A" borderRadius="md" p="3" mt="5">
            <Badge colorScheme="green" mb="1">Completed</Badge>
            <Text fontSize="sm">Install GenX Desktop App</Text>
            <Button
              variant="link"
              color="whiteAlpha.900"
              fontSize="sm"
              mt="1"
              _hover={{ textDecoration: "underline" }}
            >
              Desktop App
            </Button>
          </Box>
        </VStack>

        <Divider my="5" borderColor="gray.500" />

        {/* Logout Button */}
        <Link href="/logout" _hover={{ textDecor: 'none' }}>
          <Flex align="center" p="2" borderRadius="md" _hover={{ bg: "#4A4A6A" }}>
            <Icon as={FiLogOut} mr="2" />
            <Text>Logout</Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
