import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  MenuItem,
  TextField,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material';
import { Favorite, Psychology, TrendingUp } from '@mui/icons-material';
import axios from 'axios';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const Compatibility = () => {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!sign1 || !sign2) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/zodiac/compatibility/${sign1.toLowerCase()}/${sign2.toLowerCase()}`
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error checking compatibility:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getCompatibilityLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Moderate';
    if (score >= 50) return 'Average';
    return 'Challenging';
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
          <Favorite sx={{ mr: 2, fontSize: 'inherit', color: 'secondary.main' }} />
          Zodiac Compatibility
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover how compatible two zodiac signs are in love and relationships
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Check Compatibility
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="First Sign"
                  value={sign1}
                  onChange={(e) => setSign1(e.target.value)}
                  variant="outlined"
                >
                  {zodiacSigns.map((sign) => (
                    <MenuItem key={sign} value={sign}>
                      {getZodiacEmoji(sign)} {sign}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Second Sign"
                  value={sign2}
                  onChange={(e) => setSign2(e.target.value)}
                  variant="outlined"
                >
                  {zodiacSigns.map((sign) => (
                    <MenuItem key={sign} value={sign}>
                      {getZodiacEmoji(sign)} {sign}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheck}
              disabled={!sign1 || !sign2 || loading}
              sx={{ mt: 3, py: 1.5 }}
              startIcon={<Psychology />}
            >
              {loading ? 'Calculating...' : 'Check Compatibility'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {result ? (
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                height: 'fit-content',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h4" gutterBottom>
                    {getZodiacEmoji(result.sign1)} + {getZodiacEmoji(result.sign2)}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {result.sign1} & {result.sign2}
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Compatibility Score
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {result.compatibility}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={result.compatibility}
                    color={getCompatibilityColor(result.compatibility)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Box textAlign="center" mt={2}>
                    <Chip
                      label={getCompatibilityLevel(result.compatibility)}
                      color={getCompatibilityColor(result.compatibility)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {result.description}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                height: 'fit-content',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(236, 72, 153, 0.05))',
              }}
            >
              <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Select Two Signs
              </Typography>
              <Typography color="text.secondary">
                Choose two zodiac signs to discover their compatibility percentage and insights
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Compatibility Tips */}
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}>
          Understanding Compatibility
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="success.main" gutterBottom>
                High Compatibility (80%+)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Natural harmony, shared values, and complementary traits create strong bonds
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="warning.main" gutterBottom>
                Moderate Compatibility (60-79%)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Good potential with some differences that require understanding and compromise
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="error.main" gutterBottom>
                Challenging Compatibility (Below 60%)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Significant differences that need extra effort, patience, and communication
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Compatibility;