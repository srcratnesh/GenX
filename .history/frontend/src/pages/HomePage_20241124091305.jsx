import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';
import {FaArrowRight } from 'react-icons/fa';
import bgVideo from './assets/bg.mp4';
import badge1 from './assets/hm1.png';
import badge2 from './assets/hm2.png';
import badge3 from './assets/hm3.png';

const HomePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <Box position="relative" overflow="hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={bgVideo}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Navbar */}
      <Flex
        as="header"
        bg="rgba(255, 255, 255, 0.3)"
        backdropFilter="blur(10px)"
        color="black"
        justify="space-between"
        align="center"
        padding="4"
      >
        <Heading size="md" fontWeight="bold">
          GenX™
        </Heading>
        <Flex gap="4">
          <Button variant="link" color='black' >BLOG</Button>
          <Button variant="link" color='black' >FAQ</Button>
          <Button variant="link" color='black' >DOCUMENTATION</Button>
        </Flex>
      </Flex>

      {/* Main Content */}
      <Flex justify="center" align="center" padding="8" direction="column" minHeight="100vh">
        <Box flex="1" maxWidth="600px" padding="4" color="white" textAlign="center">
          <Heading as="h1" size="3xl" mb="4">Earn a stake in the Future!</Heading>
          <Text fontSize="xl" mb="8">Get rewarded for your unused internet.</Text>

          {/* Mythological Badges */}
  <Flex justify="center" gap="0" mb="8" position="relative">
    <Image
      src={badge1}
      alt="Badge 1"
      boxSize="160px"
      style={{
        filter: 'drop-shadow(0 0 10px yellow)',
        zIndex: 1,
        marginTop: '20px', // Slightly pushes it behind badge2
        marginRight: '-40px', // Overlaps slightly with badge2
      }}
    />
    <Image
      src={badge2}
      alt="Badge 2"
      boxSize="180px"
      style={{
        filter: 'drop-shadow(0 0 15px yellow)',
        position: 'relative',
        zIndex: 3,
      }}
    />
    <Image
      src={badge3}
      alt="Badge 3"
      boxSize="160px"
      style={{
        filter: 'drop-shadow(0 0 10px yellow)',
        zIndex: 1,
        marginTop: '20px', // Slightly pushes it behind badge2
        marginLeft: '-40px', // Overlaps slightly with badge2
      }}
    />
</Flex>


          
          <Button
            bg="pink.400"
            size="lg"
            color="black"
            _hover={{
              bg: '.200',
              transform: 'scale(1.05)',
              boxShadow: '0px 0px 15px rgba(255, 105, 180, 0.6)',
            }}
            rightIcon={<FaArrowRight />}
            onClick={() => navigate('/signin')}
            transition="background 0.3s, transform 0.2s, box-shadow 0.2s"
            _active={{ transform: 'scale(0.95)' }}
          >
            GET STARTED
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
