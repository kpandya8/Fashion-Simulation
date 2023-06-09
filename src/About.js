import React from 'react';
import "./styles.css";
import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

const About = () => {
  const teamMembers = [
    {
      name: "Suvarshitha Kalvakuntla",
      title: "(1225459183)",
      image: "./suvarshitha.png",
      description: "Graduate student at Arizona State University",
    },
    {
      name: "Aryan Mehta",
      title: "(1225456817)",
      image: "./aryan.jpg",
      description: "Graduate student at Arizona State University",
    },
    {
      name: "Bindiya Vundavalli",
      title: "(1221958478)",
      image: "./bindiya.png",
      description: "Graduate student at Arizona State University",
    },
    // Add more team members here
  ];

  return (
    <Flex spacing={4}>
      {teamMembers.map((member, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="md"
        >
          <Image src={member.image} alt={member.name} w="300px" h="300px" objectFit="cover" />
          <Heading as="h3" size="md" mt={4} mb={2}>
            {member.name}
          </Heading>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {member.title}
          </Text>
          <Text>{member.description}</Text>
        </Box>
      ))}
    </Flex>
  );
};


export default About;
