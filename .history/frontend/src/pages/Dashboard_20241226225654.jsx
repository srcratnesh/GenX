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
import axios from "axios";

import lvl2Image from "./assets/lvl2.png"; // Replace with your path
import symbolImage from "./assets/symbol.png"; // Replace with your path

function Dashboard() {
  const bg = useColorModeValue("white", "black");
  const cardBg = useColorModeValue("gray.200", "gray.700");
  const buttonBg = useColorModeValue("white", "black");

  // State management
  const [points, setPoints] = useState(100.65);
  const [todayPoints, setTodayPoints] = useState(0);
  const [referrals, setReferrals] = useState(0); // Placeholder for referral data
  const userId = localStorage.getItem("userId");
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Night";
  };

  const getYugaStatus = () => {
    if (points <= 1728000) return "Satya Yuga (Golden Age)";
    if (points >= 1296000) return "Treta Yuga (Silver Age)";
    if (points >= 864000) return "Dvapara Yuga (Bronze Age)";
    return "Kali Yuga (Iron Age)";
  };

  // Simulate and sync points with backend
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + 0.25);
      setTodayPoints((prev) => prev + 0.25);

      if (userId) {
        axios
          .post("/api/mining/start", { userId })
          .then((response) => console.log("Points synced:", response.data))
          .catch((error) =>
            console.error("Error syncing points:", error.response?.data || error.message)
          );
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [userId]);

  return (
    <Flex height="100vh" direction="column" bg={bg} p="5">
      {/* Header */}
      <Flex
        bg={buttonBg}
        p="2"
        rounded="lg"
        boxShadow="lg"
        align="center"
        justify="space-between"
      >
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
            _hover={{ bg: "purple.100", boxShadow: "0 0 8px rgba(128, 0, 128, 0.7)" }}
          >
            Copy Referral Link
          </Button>
          <IconButton
            icon={<FiLink />}
            size="xs"
            variant="ghost"
            aria-label="Link Icon"
            borderRadius="full"
          />
        </HStack>
      </Flex>

      {/* Account Progress */}
      <Flex alignItems="center" p="3" w="full" maxW="600px" justifyContent="right" ml="auto">
        <Text fontWeight="bold" mr="2" fontSize="sm">
          Account Status:
        </Text>
        <Box flex="1" mr="2" width="200px">
          <Progress
            value={(points % 1000) / 10}
            size="xs"
            colorScheme="orange"
            bg="gray.700"
            borderRadius="full"
          />
        </Box>
        <Image src={lvl2Image} alt="Level Badge" boxSize="45px" ml="4" />
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
        <StatCard
          title="Satya Yuga Rewards:"
          value={`${points.toFixed(2)} Points`}
          bg={cardBg}
          image={symbolImage}
        />
        <StatCard
          title="Today's Rewards:"
          value={`${todayPoints.toFixed(2)} Points`}
          bg={cardBg}
          image={symbolImage}
        />
        <StatCard title="Yuga Status" value={getYugaStatus()} bg={cardBg} />
      </Grid>

      {/* Reward Stats and Time-Limited Section */}
      <Grid templateColumns="repeat(2, 1fr)" gap="4" mt="6">
        <Box bg={cardBg} p="4" rounded="lg">
          <Text fontWeight="bold">Reward Stats</Text>
          <Box height="200px" bg="gray.500" mt="4" rounded="lg" />
        </Box>
        <Box bg={cardBg} p="4" rounded="lg">
          <Flex direction="column" align="center">
            <HStack spacing="2">
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
            <Text mb="2" fontSize="2xl" fontWeight="bold" color="purple.400">
              Get 1,000 EXP
            </Text>
            <Text mb="2">Follow us on X (Twitter)</Text>
            <Button color="white" bg="purple.600" mt="2" _hover={{ bg: "purple.500" }}>
              Click to Join
            </Button>
          </Box>
        </Box>
      </Grid>
    </Flex>
  );
}

const StatCard = ({ title, value, bg, image }) => (
  <Box bg={bg} p="4" rounded="lg" textAlign="center">
    <Stat>
      <StatLabel fontSize="sm" fontWeight="bold">
        {title}
      </StatLabel>
      <StatNumber fontSize="xl">{value}</StatNumber>
      {image && <Image src={image} alt="Symbol" boxSize="35px" mx="auto" mt="2" />}
    </Stat>
  </Box>
);

export default Dashboard;
