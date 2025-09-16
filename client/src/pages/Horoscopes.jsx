import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  MenuItem,
  TextField,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import { AutoAwesome, TrendingUp } from '@mui/icons-material';
import axios from 'axios';

const zodiacSigns = [
  'All Signs', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const Horoscopes = () => {
  const [horoscopes, setHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('daily');
  const [selectedSign, setSelectedSign] = useState('All Signs');

  useEffect(() => {
    fetchHoroscopes();
  }, [selectedType, selectedSign]);

  const fetchHoroscopes = async () => {
    setLoading(true);
    try {
      const params = {
        type: selectedType,
      };
      
      if (selectedSign !== 'All Signs') {
        params.zodiacSign = selectedSign.toLowerCase();
      }

      const response = await axios.get('http://localhost:5000/api/horoscopes', { params });
      setHoroscopes(response.data);
    } catch (error) {
      console.error('Error fetching horoscopes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (event, newValue) => {
    setSelectedType(newValue);
  };

  const handleSignChange = (event) => {
    setSelectedSign(event.target.value);
  };

  const getZodiacEmoji = (sign) => {
    const emojis = {
      aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
      leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
      sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
    };
    return emojis[sign.toLowerCase()] || '⭐';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          <AutoAwesome sx={{ mr: 2, fontSize: 'inherit' }} />
          Horoscopes
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover what the stars have in store for you
        </Typography>
      </Box>

      {/* Controls */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Tabs
              value={selectedType}
              onChange={handleTypeChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'capitalize',
                  fontWeight: 600,
                },
              }}
            >
              <Tab label="Daily" value="daily" />
              <Tab label="Weekly" value="weekly" />
              <Tab label="Monthly" value="monthly" />
              <Tab label="Yearly" value="yearly" />
            </Tabs>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Zodiac Sign"
              value={selectedSign}
              onChange={handleSignChange}
              variant="outlined"
            >
              {zodiacSigns.map((sign) => (
                <MenuItem key={sign} value={sign}>
                  {sign}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Horoscopes Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress size={60} />
        </Box>
      ) : horoscopes.length > 0 ? (
        <Grid container spacing={3}>
          {horoscopes.map((horoscope) => (
            <Grid item xs={12} md={6} lg={4} key={horoscope.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      {getZodiacEmoji(horoscope.zodiacSign)} {horoscope.zodiacSign}
                    </Typography>
                    <Chip
                      label={horoscope.type}
                      size="small"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ lineHeight: 1.6 }}
                  >
                    {horoscope.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {horoscope.luckyNumber && (
                      <Chip
                        label={`Lucky: ${horoscope.luckyNumber}`}
                        size="small"
                        variant="outlined"
                        color="success"
                      />
                    )}
                    {horoscope.luckyColor && (
                      <Chip
                        label={horoscope.luckyColor}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    )}
                    {horoscope.mood && (
                      <Chip
                        label={horoscope.mood}
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    )}
                  </Box>
                  
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 2 }}
                  >
                    {new Date(horoscope.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No horoscopes available
          </Typography>
          <Typography color="text.secondary">
            {selectedSign !== 'All Signs' 
              ? `No ${selectedType} horoscopes found for ${selectedSign}`
              : `No ${selectedType} horoscopes available at the moment`
            }
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Horoscopes;