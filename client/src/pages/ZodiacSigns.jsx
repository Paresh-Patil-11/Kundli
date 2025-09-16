import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Psychology, Star } from '@mui/icons-material';
import axios from 'axios';

const ZodiacSigns = () => {
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchZodiacSigns();
  }, []);

  const fetchZodiacSigns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/zodiac');
      setZodiacSigns(response.data);
    } catch (error) {
      console.error('Error fetching zodiac signs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getElementColor = (element) => {
    const colors = {
      Fire: '#ff6b6b',
      Earth: '#51cf66',
      Air: '#74c0fc',
      Water: '#91a7ff',
    };
    return colors[element] || '#6c757d';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          <Psychology sx={{ mr: 2, fontSize: 'inherit' }} />
          Zodiac Signs
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore the unique characteristics of all 12 zodiac signs
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {zodiacSigns.map((sign) => (
          <Grid item xs={12} sm={6} md={4} key={sign.name}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: '3rem', mb: 1 }}
                  >
                    {sign.symbol}
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {sign.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {sign.dates}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'center' }}>
                    <Chip
                      label={sign.element}
                      size="small"
                      sx={{
                        backgroundColor: getElementColor(sign.element),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={sign.planet}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  sx={{ lineHeight: 1.6, flexGrow: 1 }}
                >
                  {sign.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Key Traits:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {sign.traits.map((trait, index) => (
                      <Chip
                        key={index}
                        label={trait}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Lucky Numbers:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {sign.luckyNumbers.map((number, index) => (
                      <Chip
                        key={index}
                        label={number}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Lucky Colors:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {sign.luckyColors.map((color, index) => (
                      <Chip
                        key={index}
                        label={color}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 6,
          p: 4,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
        }}
      >
        <Star sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Discover Your Cosmic Connection
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Each zodiac sign carries unique energies and characteristics that influence personality, 
          relationships, and life path. Understanding your sign can provide valuable insights 
          into your strengths, challenges, and potential.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ZodiacSigns;