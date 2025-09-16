import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Paper,
  Chip,
  MenuItem,
} from '@mui/material';
import { Casino, Star, CalendarToday } from '@mui/icons-material';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const LuckyNumbers = () => {
  const [method, setMethod] = useState('zodiac');
  const [zodiacSign, setZodiacSign] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const zodiacLuckyNumbers = {
    aries: { numbers: [1, 8, 17, 26, 35], colors: ['Red', 'Orange', 'Yellow'] },
    taurus: { numbers: [2, 6, 9, 12, 24], colors: ['Green', 'Pink', 'Blue'] },
    gemini: { numbers: [5, 7, 14, 23, 32], colors: ['Yellow', 'Silver', 'Grey'] },
    cancer: { numbers: [2, 7, 11, 16, 20, 25], colors: ['White', 'Silver', 'Sea Green'] },
    leo: { numbers: [1, 3, 10, 19, 28], colors: ['Gold', 'Orange', 'Red'] },
    virgo: { numbers: [6, 15, 20, 24, 33], colors: ['Navy Blue', 'Grey', 'Brown'] },
    libra: { numbers: [4, 6, 13, 15, 24], colors: ['Blue', 'Green', 'Pink'] },
    scorpio: { numbers: [8, 11, 18, 22, 31], colors: ['Deep Red', 'Black', 'Maroon'] },
    sagittarius: { numbers: [3, 9, 15, 21, 27], colors: ['Purple', 'Turquoise', 'Orange'] },
    capricorn: { numbers: [6, 9, 15, 18, 27], colors: ['Brown', 'Black', 'Dark Green'] },
    aquarius: { numbers: [4, 7, 11, 22, 29], colors: ['Blue', 'Silver', 'Aqua'] },
    pisces: { numbers: [3, 9, 12, 15, 18, 24], colors: ['Sea Green', 'Lavender', 'White'] },
  };

  const generateLuckyNumbers = () => {
    setLoading(true);
    
    setTimeout(() => {
      let luckyNumbers = [];
      let luckyColors = [];
      let description = '';

      if (method === 'zodiac' && zodiacSign) {
        const signData = zodiacLuckyNumbers[zodiacSign.toLowerCase()];
        luckyNumbers = signData.numbers;
        luckyColors = signData.colors;
        description = `Based on your zodiac sign ${zodiacSign}, these numbers and colors carry special significance and positive energy for you.`;
      } else if (method === 'birthdate' && birthDate) {
        // Generate numbers based on birth date
        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        // Simple numerology calculation
        const lifePathNumber = calculateLifePathNumber(day, month, year);
        luckyNumbers = [
          lifePathNumber,
          day,
          month,
          (day + month) % 31 + 1,
          (year % 100) % 31 + 1,
        ].filter((num, index, arr) => arr.indexOf(num) === index); // Remove duplicates
        
        luckyColors = ['Blue', 'Green', 'Purple']; // Default colors for birth date method
        description = `Based on your birth date, these numbers are calculated using numerological principles and carry personal significance for you.`;
      }

      setResults({
        numbers: luckyNumbers,
        colors: luckyColors,
        description,
        todaySpecial: Math.floor(Math.random() * 99) + 1, // Random special number for today
      });
      setLoading(false);
    }, 1500);
  };

  const calculateLifePathNumber = (day, month, year) => {
    const sum = day + month + year;
    let result = sum;
    
    while (result > 9 && result !== 11 && result !== 22 && result !== 33) {
      result = result.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return result;
  };

  const generateRandomNumbers = () => {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!randomNumbers.includes(num)) {
        randomNumbers.push(num);
      }
    }
    
    const randomColors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
    const selectedColors = randomColors.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    setResults({
      numbers: randomNumbers.sort((a, b) => a - b),
      colors: selectedColors,
      description: 'These randomly generated numbers and colors are infused with cosmic energy for today.',
      todaySpecial: Math.floor(Math.random() * 99) + 1,
    });
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
          <Casino sx={{ mr: 2, fontSize: 'inherit' }} />
          Lucky Numbers & Colors
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover your personal lucky numbers and colors based on astrology and numerology
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Generate Your Lucky Numbers
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <MenuItem value="zodiac">Based on Zodiac Sign</MenuItem>
                  <MenuItem value="birthdate">Based on Birth Date</MenuItem>
                </TextField>
              </Grid>

              {method === 'zodiac' && (
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Your Zodiac Sign"
                    value={zodiacSign}
                    onChange={(e) => setZodiacSign(e.target.value)}
                  >
                    {zodiacSigns.map((sign) => (
                      <MenuItem key={sign} value={sign}>
                        {sign}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              {method === 'birthdate' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Birth Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={generateLuckyNumbers}
              disabled={loading || (method === 'zodiac' && !zodiacSign) || (method === 'birthdate' && !birthDate)}
              sx={{ mt: 3, py: 1.5 }}
              startIcon={<Star />}
            >
              {loading ? 'Calculating...' : 'Generate Lucky Numbers'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Or try your luck with
              </Typography>
              <Button
                variant="outlined"
                onClick={generateRandomNumbers}
                startIcon={<Casino />}
              >
                Random Numbers
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {results ? (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Your Lucky Numbers & Colors
                </Typography>

                {/* Lucky Numbers */}
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Lucky Numbers
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {results.numbers.map((number, index) => (
                      <Chip
                        key={index}
                        label={number}
                        color="primary"
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          minWidth: 50,
                          height: 50,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Lucky Colors */}
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Lucky Colors
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {results.colors.map((color, index) => (
                      <Chip
                        key={index}
                        label={color}
                        color="secondary"
                        sx={{ fontWeight: 600 }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Today's Special Number */}
                <Box mb={3}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Today's Special Number
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      background: 'linear-gradient(45deg, #6366f1, #ec4899)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {results.todaySpecial}
                    </Typography>
                  </Paper>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {results.description}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(236, 72, 153, 0.05))',
              }}
            >
              <Casino sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Your Lucky Numbers Await
              </Typography>
              <Typography color="text.secondary">
                Choose your preferred method and generate your personalized lucky numbers and colors
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Information Section */}
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}>
          How to Use Your Lucky Numbers
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="primary.main" gutterBottom>
                Daily Life
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use your lucky numbers when making important decisions, choosing dates, or in situations where you need extra positive energy.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="secondary.main" gutterBottom>
                Colors & Fashion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Incorporate your lucky colors into your wardrobe, home decor, or important presentations to attract positive vibrations.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="success.main" gutterBottom>
                Meditation & Focus
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use your lucky numbers during meditation or visualization exercises to enhance your connection with positive cosmic energy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LuckyNumbers;