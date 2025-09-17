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
            textAlign: 'center',
            background: 'linear-gradient(45deg, #FFD700, #FFD369)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
          }}
        >
          🔮 Welcome to KundliVision ✨
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 4,
            fontStyle: 'italic',
            textShadow: '0 0 10px rgba(245, 245, 220, 0.3)',
          }}
        >
          Unveil the cosmic secrets and discover your destiny through ancient mystical wisdom
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/horoscopes"
            variant="contained"
            size="large"
            startIcon={<AutoAwesome />}
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1.1rem',
              boxShadow: '0 8px 25px rgba(106, 13, 173, 0.4)',
            }}
          >
            Explore Horoscopes
          </Button>
          <Button
            component={Link}
            to="/zodiac"
            variant="outlined"
            size="large"
            startIcon={<Psychology />}
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Discover Zodiac
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
                background: 'linear-gradient(135deg, rgba(46, 8, 84, 0.3), rgba(28, 28, 28, 0.3))',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(255, 215, 0, 0.2)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    color: feature.color,
                    mb: 2,
                    filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.3))',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  fontWeight={600}
                  sx={{ color: '#FFD700' }}
                >
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
          sx={{ 
            mb: 4, 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #FFD700, #FFD369)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ✨ Today's Cosmic Insights ✨
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
                    background: 'linear-gradient(135deg, rgba(46, 8, 84, 0.4), rgba(28, 28, 28, 0.4))',
                    border: '1px solid rgba(192, 192, 192, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        textTransform: 'capitalize', 
                        mr: 2,
                        color: '#FFD700',
                        fontWeight: 600,
                      }}
                    >
                      {horoscope.zodiacSign}
                    </Typography>
                    <Chip
                      label={horoscope.mood || 'Positive'}
                      size="small"
                      sx={{
                        background: 'linear-gradient(45deg, #6A0DAD, #001F54)',
                        color: '#F5F5DC',
                      }}
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
                        sx={{ borderColor: '#FFD700', color: '#FFD700' }}
                      />
                    )}
                    {horoscope.luckyColor && (
                      <Chip
                        label={horoscope.luckyColor}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          textTransform: 'capitalize',
                          borderColor: '#C0C0C0',
                          color: '#C0C0C0',
                        }}
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
            sx={{ px: 4, py: 1.5 }}
          >
            Explore All Horoscopes
          </Button>
        </Box>
      </Box>

      {/* Call to Action */}
      <Paper
        sx={{
          p: 6,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(46, 8, 84, 0.6), rgba(28, 28, 28, 0.6))',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          backdropFilter: 'blur(15px)',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          fontWeight={600}
          sx={{
            background: 'linear-gradient(45deg, #FFD700, #FFD369)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🌟 Ready to Unlock Your Cosmic Destiny? 🌟
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            fontSize: '1.1rem',
            fontStyle: 'italic',
          }}
        >
          Join thousands of seekers who trust KundliVision for mystical guidance.
          Unveil your hidden potential, understand your soul connections, and navigate life with ancient cosmic wisdom.
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{ 
            mt: 2, 
            px: 5, 
            py: 2,
            fontSize: '1.2rem',
            background: 'linear-gradient(45deg, #6A0DAD, #001F54)',
            '&:hover': {
              background: 'linear-gradient(45deg, #001F54, #6A0DAD)',
              transform: 'translateY(-2px)',
              boxShadow: '0 15px 35px rgba(255, 215, 105, 0.4)',
            },
          }}
        >
          Begin Your Mystical Journey
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;