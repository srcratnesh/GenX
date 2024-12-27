import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Progress,
  HStack,
  IconButton,
  useColorModeValue,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
} from "@chakra-ui/react";
import { FiUser, FiLink, FiClock } from "react-icons/fi";
import axios from 'axios';

import lvl2Image from "./assets/lvl2.png"; // Replace with your path
import symbolImage from "./assets/symbol.png"; // Replace with your path

function Dashboard() {
  const bg = useColorModeValue("white", "black");
  const cardBg = useColorModeValue("gray.200", "gray.700");
  const buttonBg = useColorModeValue("white", "black");

  // State to handle dynamic points and tasks
  const [points, setPoints] = useState(100.65); // Replace with dynamic data later
  const [todayPoints, setTodayPoints] = useState(0);
  const [referrals] = useState(0); // Assume no referrals for now

  const currentHour = new Date().getHours();

  // Retrieve user info from localStorage
  const userId = localStorage.getItem("userId");

  const getGreeting = () => {
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Night";
    }
  };

  const getYugaStatus = () => {
    if (points <= 1728000) {
      return "Satya Yuga (Golden Age)";
    } else if (points >= 1296000) {
      return "Treta Yuga (Silver Age)";
    } else if (points >= 864000) {
      return "Dvapara Yuga (Bronze Age)";
    } else {
      return "Kali Yuga (Iron Age)";
    }
  };

  // Simulate points update (Optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + 0.25);
      setTodayPoints(prev => prev + 0.25);

      // Optionally, send points to the backend for persistence
      if (userId) {
        axios.post('/api/mining/start', { userId }); // Pass actual user ID
      }
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [userId]);

  return (
    <Flex height="100vh" direction="column" bg={bg} p="5">
      {/* Header */}
      <Flex bg={buttonBg} p="2" rounded="lg" boxShadow="lg" align="center" justify="space-between">
        <HStack spacing="2">
          <IconButton
            icon={<FiUser />}
            size="xs"
            variant="ghost"
            aria-label="Profile Icon"
            borderRadius="full"
          />
          <Button size="sm" variant="ghost" borderRadius="full" fontSize="sm">
            Referred: {referrals}
          </Button>
        </HStack>

        <HStack spacing="3">
          <Button
            size="sm"
            variant="outline"
            borderRadius="full"
            fontSize="sm"
            _hover={{
              bg: "pink.400",
              boxShadow: "0 0 8px 4px rgba(128, 0, 128, 0.7)",
              borderColor: "purple.400",
            }}
            _focus={{
              boxShadow: "0 0 8px 4px rgba(255, 255, 255, 0.7)",
            }}
            boxShadow="0 0 8px 4px rgba(255, 255, 255, 0.7)"
          >
            Copy Referral Link
          </Button>

          <IconButton
            icon={<FiLink />}
            size="xs"
            variant="ghost"
            aria-label="Link Icon"
            borderRadius="full"
            _hover={{
              boxShadow: "0 0 8px 4px rgba(128, 0, 128, 0.7)",
            }}
            boxShadow="0 0 8px 4px rgba(255, 255, 255, 0.7)"
          />
        </HStack>
      </Flex>

      {/* Account Progress */}
      <Flex alignItems="center" p="3" w="full" maxW="600px" justifyContent="right" ml="auto">
        <Text fontWeight="bold" mr="2" fontSize="sm">
          Account Status:
        </Text>
        <Box flex="1" mr="2" width="200px">
          <Progress value={(points % 1000) / 10} size="xs" colorScheme="orange" bg="gray.700" borderRadius="full" />
        </Box>
        <Image src={lvl2Image} alt="Lvl2 Badge" boxSize="45px" ml="4" />
        <Flex alignItems="center" ml="4">
          <Text mr="1" fontSize="sm">
            Total:
          </Text>
          <Text fontWeight="bold" fontSize="sm">
            {points.toFixed(2)} pt
          </Text>
        </Flex>
      </Flex>

      {/* Greeting */}
      <Heading size="lg" mt="6">
        {getGreeting()}, User! 👋
      </Heading>

      {/* Stat Cards */}
      <Grid templateColumns="repeat(3, 1fr)" gap="4" mt="6">
        <StatCard title="Satya Yuga Rewards:" value={`${points.toFixed(2)} Points`} bg={cardBg} image={symbolImage} />
        <StatCard title="Today's Rewards:" value={`${todayPoints} Points`} bg={cardBg} image={symbolImage} />
        <StatCard title="Yuga Status" value={getYugaStatus()} bg={cardBg} />
      </Grid>

      {/* Reward Stats and Time-Limited Section */}
      <Grid templateColumns="repeat(2, 1fr)" gap="4" mt="6">
        <Box bg={cardBg} p="4" rounded="lg">
          <Text fontWeight="bold">Reward Stats</Text>
          <Box height="200px" bg="gray.500" mt="4" rounded="lg" />
        </Box>

        <Box bg={cardBg} p="4" rounded="lg">
          <Flex direction="column" align="center" justify="center">
            <HStack spacing="2" align="center">
              <Icon as={FiClock} boxSize="6" color="white" />
              <Text fontSize="xl" fontWeight="bold">
                Time-Limited
              </Text>
            </HStack>
          </Flex>

          <Box
            bg="gray.500"
            p="4"
            mt="4"
            rounded="lg"
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Text mb="2" fontSize="2xl" fontWeight="bold" color="purple.00">
              Get 1,000 EXP
            </Text>

            <Text mb="2">Follow us on X (Twitter)</Text>

            <Button color="purple.100" mt="2" bg='purple'>
              Click to Join
            </Button>
          </Box>
        </Box>
      </Grid>
    </Flex>
  );
}

const StatCard = ({ title, value, bg, image }) => (
  <Box bg={bg} p="4" rounded="lg">
    <Stat>
      <StatLabel fontSize="sm" fontWeight="bold">
        {title}
      </StatLabel>
      <StatNumber fontSize="xl">{value}</StatNumber>
      {image && <Image src={image} alt="Symbol" boxSize="35px" ml="auto" mt="-5px" />}
    </Stat>
  </Box>
);

export default Dashboard;
