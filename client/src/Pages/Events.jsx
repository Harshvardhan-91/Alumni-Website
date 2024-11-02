import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box, Grid, TextField, Card, CardMedia, Select, MenuItem, CardActions, CardContent } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

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
    },{
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
    },{
      alt: 'company logo 7',
      src: 'https://cdn.worldvectorlogo.com/logos/bharat-petroleum-logo.svg',
    },
    {
      alt: 'company logo 8',
      src: 'https://seeklogo.com/images/P/Pidilite-logo-E5FA719787-seeklogo.com.png',
    },
    {
      alt: 'company logo 9',
      src: 'https://seeklogo.com/images/T/TATA_Chemicals_Limited-logo-A0A0D1B4B3-seeklogo.com.png',
    },
  ];
  return (
    <div>    

      {/* Hero Section */}
      <Box
      sx={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8, bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Explore the Future of Chemical Engineering
        </Typography>
        <Typography paragraph>
          Join us for cutting-edge discussions, breakthrough research, and hands-on workshops that shape tomorrow's innovations.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Get Ticket
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>


      {/* Upcoming Events Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Upcoming Events
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {['Weekdays', 'Event Types', 'Any Category'].map((label) => (
            <Grid item xs={12} md={4} key={label}>
              <Select fullWidth defaultValue="" displayEmpty>
                <MenuItem value="">{label}</MenuItem>
              </Select>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {[
            {
              date: 'November 15, 2024',
              title: 'ChemInnovate 2024',
              image:'../assets/event.jpg',
              description: 'ChemInnovate is an annual event showcasing the latest innovations and breakthroughs in chemical engineering. Participants will get the opportunity to present research papers, attend expert talks, and explore advancements in sustainable chemical processes.'
            },
            {
              date: 'December 2–3, 2024',
              title: 'Process Simulation Challenge',
              image:
                'https://storage.googleapis.com/a1aa/image/rnfTHtvth3WsNKGihiItAwQrbXHB4bRqisLldgKqJX9qVH1JA.jpg',
              description: 'A 24-hour hackathon where students tackle real-world chemical process problems using simulation software like Aspen Plus, COMSOL, and MATLAB. Compete in teams to find the most efficient solutions and present your findings to a panel of judges.'
            },
            {
              date: 'October 30, 2024',
              title: 'Chem-E-Car Competition',
              image:
                'https://storage.googleapis.com/a1aa/image/qZIYazPf8etQyE5GknAD11nhLusHjJRj4k6VBF8DqRkHrOqTA.jpg',
              description: "Teams design and build small, chemically powered cars that must carry a specified load over a given distance. The goal is to precisely control the car's chemical reaction to stop as close to the target distance as possible."
            }
          ].map((event, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image='https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt={event.title}
                />
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>{event.date}</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={4}>
          <Button variant="outlined" color="primary">Load More</Button>
        </Box>
      </Container>

      {/* Brands Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Join these brands
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          We’ve had the pleasure of working with industry-defining brands. These are just some of them.
        </Typography>
        <Grid container justifyContent="center" spacing={3}>
          {brands.map((brand, index) => (
            <Grid item key={index}>
              <Box
                component="img"
                src={brand.src}
                alt={brand.alt}
                height={50}
                width={100}
                sx={{ mb: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>  
    </div>
  );
};

export default Events;