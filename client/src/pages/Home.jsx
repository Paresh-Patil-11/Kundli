import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
} from '@mui/material';
import {
  AutoAwesome,
  Psychology,
  Favorite,
  Timeline,
  TrendingUp,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [todayHoroscopes, setTodayHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayHoroscopes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/horoscopes/today');
        setTodayHoroscopes(response.data.slice(0, 4)); // Show only first 4
      } catch (error) {
        console.error('Error fetching horoscopes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayHoroscopes();
  }, []);

  const features = [
    {
      icon: <AutoAwesome sx={{ fontSize: 40 }} />,
      title: 'Daily Horoscopes',
      description: 'Get personalized daily insights based on your zodiac sign',
      link: '/horoscopes',
      color: '#6366f1',
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'Zodiac Profiles',
      description: 'Explore detailed profiles of all 12 zodiac signs',
      link: '/zodiac',
      color: '#ec4899',
    },
    {
      icon: <Favorite sx={{ fontSize: 40 }} />,
      title: 'Compatibility',
      description: 'Check your compatibility with other zodiac signs',
      link: '/compatibility',
      color: '#f59e0b',
    },
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      title: 'Birth Chart',
      description: 'Generate your personalized birth chart',
      link: '/birth-chart',
      color: '#10b981',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 3,
          }}
        >
          Welcome to KundliVision 
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Discover the mysteries of the universe through astrology, horoscopes, and cosmic guidance
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/horoscopes"
            variant="contained"
            size="large"
            startIcon={<AutoAwesome />}
          >
            View Horoscopes
          </Button>
          <Button
            component={Link}
            to="/zodiac"
            variant="outlined"
            size="large"
            startIcon={<Psychology />}
          >
            Explore Zodiac
          </Button>
        </Box>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} mb={8}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              component={Link}
              to={feature.link}
              sx={{
                height: '100%',
                textDecoration: 'none',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    color: feature.color,
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Today's Horoscopes Preview */}
      <Box mb={8}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ mb: 4, fontWeight: 600 }}
        >
          Today's Horoscope Highlights
        </Typography>
        
        {loading ? (
          <Box textAlign="center" py={4}>
            <Typography>Loading horoscopes...</Typography>
          </Box>
        ) : todayHoroscopes.length > 0 ? (
          <Grid container spacing={3}>
            {todayHoroscopes.map((horoscope) => (
              <Grid item xs={12} md={6} key={horoscope.id}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ textTransform: 'capitalize', mr: 2 }}>
                      {horoscope.zodiacSign}
                    </Typography>
                    <Chip
                      label={horoscope.mood || 'Positive'}
                      size="small"
                      color="primary"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {horoscope.content.substring(0, 150)}...
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    {horoscope.luckyNumber && (
                      <Chip
                        label={`Lucky: ${horoscope.luckyNumber}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {horoscope.luckyColor && (
                      <Chip
                        label={horoscope.luckyColor}
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No horoscopes available for today
            </Typography>
            <Typography color="text.secondary" paragraph>
              Check back later for your daily KundliVision!
            </Typography>
          </Paper>
        )}
        
        <Box textAlign="center" mt={4}>
          <Button
            component={Link}
            to="/horoscopes"
            variant="contained"
            size="large"
            startIcon={<TrendingUp />}
          >
            View All Horoscopes
          </Button>
        </Box>
      </Box>

      {/* Call to Action */}
      <Paper
        sx={{
          p: 6,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Ready to Explore Your Cosmic Journey?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
          Join thousands of users who trust Cosmic Insights for their daily astrological guidance.
          Discover your potential, understand your relationships, and navigate life with cosmic wisdom.
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Get Started Today
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;