import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Progress, Image, Grid, Heading, Stat, StatLabel, StatNumber, IconButton, useColorModeValue, HStack } from "@chakra-ui/react";
import { FiUser, FiLink, FiClock } from "react-icons/fi";
import lvl2Image from "./assets/lvl2.png"; 
import symbolImage from "./assets/symbol.png"; 
import axios from "axios";

function Dashboard() {
  const bg = useColorModeValue("white", "black");
  const cardBg = useColorModeValue("gray.200", "gray.700");
  const buttonBg = useColorModeValue("white", "black");

  // State to handle dynamic points and tasks
  const [points, setPoints] = useState(0); // Set to 0 initially, fetch dynamically
  const [todayPoints, setTodayPoints] = useState(0);
  const [referrals] = useState(0);
  
  const userId = localStorage.getItem('userId'); // Get user ID from localStorage

  // Fetch points on component mount
  useEffect(() => {
    const fetchPoints = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/mining/balance/${userId}`);
          setPoints(response.data.balance);
        } catch (error) {
          console.error("Error fetching points:", error);
        }
      }
    };
    fetchPoints();
  }, [userId]);

  const currentHour = new Date().getHours();

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
          />
        </HStack>
      </Flex>

      <Box mt="6" mb="6" bg={cardBg} rounded="lg" p="6" boxShadow="lg">
        <Heading as="h2" size="lg" textAlign="center" mb="6" color="purple.500">
          {getGreeting()}, User!
        </Heading>
        <Text mb="3" textAlign="center" color="pink.300">
          {getYugaStatus()} - Total Points: {points}
        </Text>

        <Grid templateColumns="repeat(3, 1fr)" gap="6">
          <Stat>
            <StatLabel>Points Mined</StatLabel>
            <StatNumber>{points}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Points Today</StatLabel>
            <StatNumber>{todayPoints}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Time Spent</StatLabel>
            <StatNumber>3h 45m</StatNumber>
          </Stat>
        </Grid>
      </Box>

      {/* Yuga Status */}
      <Box mt="6" p="6" bg={cardBg} borderRadius="lg" boxShadow="lg">
        <Flex align="center">
          <Image src={lvl2Image} alt="level image" boxSize="50px" mr="4" />
          <Text fontSize="xl" color="purple.500">
            You are in the <strong>{getYugaStatus()}</strong>!
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Dashboard;
