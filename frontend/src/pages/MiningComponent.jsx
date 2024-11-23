import React, { useState, useEffect } from 'react';
import { Box, Button, Text, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios'; // Ensure axios is properly imported

const MiningComponent = ({ user }) => { // Make sure the user object is passed as a prop
    const [balance, setBalance] = useState(0.0);
    const [isMining, setIsMining] = useState(false);
    const toast = useToast(); // Make sure to use the toast hook here

    // Function to start the mining process
    const startMining = async () => {
        if (!user || !user._id) {
            console.error('User ID is not available');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/mining/start', { userId: user._id });
            setBalance(response.data.balance);
            toast({
                title: 'Mining Successful',
                description: `You have mined ${response.data.minedPoints} tokens.`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Mining error:', error);
            toast({
                title: 'Mining Error',
                description: 'Failed to mine points. Please check your internet connection.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Function to fetch the user's current balance
    const fetchBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/mining/balance/${user._id}`);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    // UseEffect to handle mining state changes
    useEffect(() => {
        let miningInterval;
        if (isMining) {
            miningInterval = setInterval(() => {
                startMining();
            }, Math.floor(Math.random() * (5000 - 3000 + 1) + 3000)); // Random interval between 3 to 5 seconds
        }

        return () => clearInterval(miningInterval);
    }, [isMining]);

    // Start mining automatically when the component mounts and fetch the balance
    useEffect(() => {
        fetchBalance();
        setIsMining(true);
    }, []);

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <Text fontSize="2xl" mb={4}>Token Balance: {balance} tokens</Text>
            {isMining ? (
                <Text color="green.500">Mining in progress... ⛏️</Text>
            ) : (
                <Button colorScheme="green" onClick={() => setIsMining(true)}>
                    Start Mining
                </Button>
            )}
            <Spinner size="md" mt={4} />
        </Box>
    );
};

export default MiningComponent;
