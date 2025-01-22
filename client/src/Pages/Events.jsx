import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';

const Events = () => {
  const brands = [
    {
      alt: 'company logo 1',
      src: 'https://cdn.worldvectorlogo.com/logos/bharat-petroleum-logo.svg',
    },
    {
      alt: 'company logo 2',
      src: 'https://seeklogo.com/images/P/Pidilite-logo-E5FA719787-seeklogo.com.png',
    },
    {
      alt: 'company logo 3',
      src: 'https://seeklogo.com/images/T/TATA_Chemicals_Limited-logo-A0A0D1B4B3-seeklogo.com.png',
    },
    {
      alt: 'company logo 4',
      src: 'https://cdn.worldvectorlogo.com/logos/bharat-petroleum-logo.svg',
    },
    {
      alt: 'company logo 5',
      src: 'https://seeklogo.com/images/P/Pidilite-logo-E5FA719787-seeklogo.com.png',
    },
    {
      alt: 'company logo 6',
      src: 'https://seeklogo.com/images/T/TATA_Chemicals_Limited-logo-A0A0D1B4B3-seeklogo.com.png',
    },
  ];

  const events = [
    {
      date: 'November 15, 2024',
      title: 'ChemInnovate 2024',
      description:
        'ChemInnovate is an annual event showcasing the latest innovations and breakthroughs in chemical engineering. Participants will get the opportunity to present research papers, attend expert talks, and explore advancements in sustainable chemical processes.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    },
    {
      date: 'December 2–3, 2024',
      title: 'Process Simulation Challenge',
      description:
        'A 24-hour hackathon where students tackle real-world chemical process problems using simulation software like Aspen Plus, COMSOL, and MATLAB. Compete in teams to find the most efficient solutions and present your findings to a panel of judges.',
      image:
        'https://storage.googleapis.com/a1aa/image/rnfTHtvth3WsNKGihiItAwQrbXHB4bRqisLldgKqJX9qVH1JA.jpg',
    },
    {
      date: 'October 30, 2024',
      title: 'Chem-E-Car Competition',
      description:
        "Teams design and build small, chemically powered cars that must carry a specified load over a given distance. The goal is to precisely control the car's chemical reaction to stop as close to the target distance as possible.",
      image:
        'https://storage.googleapis.com/a1aa/image/qZIYazPf8etQyE5GknAD11nhLusHjJRj4k6VBF8DqRkHrOqTA.jpg',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop')"
        bgSize="cover"
        bgPos="center"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container
          maxW="lg"
          textAlign="center"
          p={8}
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="md"
        >
          <Heading as="h2" size="lg" mb={4}>
            Explore the Future of Chemical Engineering
          </Heading>
          <Text mb={6}>
            Join us for cutting-edge discussions, breakthrough research, and hands-on workshops that shape tomorrow's innovations.
          </Text>
          <HStack spacing={4} justifyContent="center">
            <Button colorScheme="blue">Get Ticket</Button>
            <Button variant="outline" colorScheme="blue">
              Learn More
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Upcoming Events Section */}
      <Container maxW="full" py={12}>
        <Heading as="h3" size="lg" mb={6}>
          Upcoming Events
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
          {['Weekdays', 'Event Types', 'Any Category'].map((label) => (
            <Select key={label} placeholder={label} />
          ))}
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {events.map((event, index) => (
            <Box key={index} borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image src={event.image} alt={event.title} height="200px" width="100%" objectFit="cover" />
              <Box p={4}>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {event.date}
                </Text>
                <Heading as="h4" size="md" mb={2}>
                  {event.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {event.description}
                </Text>
              </Box>
              <Box p={4} textAlign="right">
                <Button size="sm" colorScheme="blue">
                  Learn More
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Box textAlign="center" mt={8}>
          <Button variant="outline" colorScheme="blue">
            Load More
          </Button>
        </Box>
      </Container>

      {/* Brands Section */}
      <Container maxW="md" py={12} textAlign="center">
        <Heading as="h3" size="lg" mb={4}>
          Join these brands
        </Heading>
        <Text mb={8}>
          We’ve had the pleasure of working with industry-defining brands. These are just some of them.
        </Text>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6} justifyContent="center">
          {brands.map((brand, index) => (
            <Image key={index} src={brand.src} alt={brand.alt} height="50px" />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Events;
