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
  Alert,
  Chip,
} from '@mui/material';
import { Timeline, Star, LocationOn, Schedule, CalendarToday } from '@mui/icons-material';

const BirthChart = () => {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateChart = () => {
    if (!formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      return;
    }

    setLoading(true);
    
    // Simulate chart generation (in a real app, this would call an astrology API)
    setTimeout(() => {
      const mockChart = {
        sunSign: 'Leo',
        moonSign: 'Pisces',
        risingSign: 'Scorpio',
        planets: [
          { name: 'Sun', sign: 'Leo', house: '10th', degree: '15°' },
          { name: 'Moon', sign: 'Pisces', house: '5th', degree: '22°' },
          { name: 'Mercury', sign: 'Virgo', house: '11th', degree: '8°' },
          { name: 'Venus', sign: 'Cancer', house: '9th', degree: '28°' },
          { name: 'Mars', sign: 'Gemini', house: '8th', degree: '12°' },
          { name: 'Jupiter', sign: 'Sagittarius', house: '2nd', degree: '5°' },
        ],
        houses: [
          { number: '1st', sign: 'Scorpio', meaning: 'Self & Identity' },
          { number: '2nd', sign: 'Sagittarius', meaning: 'Money & Values' },
          { number: '3rd', sign: 'Capricorn', meaning: 'Communication' },
          { number: '4th', sign: 'Aquarius', meaning: 'Home & Family' },
          { number: '5th', sign: 'Pisces', meaning: 'Creativity & Romance' },
          { number: '6th', sign: 'Aries', meaning: 'Work & Health' },
        ],
      };
      
      setChart(mockChart);
      setLoading(false);
    }, 2000);
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
          <Timeline sx={{ mr: 2, fontSize: 'inherit' }} />
          Birth Chart Generator
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Generate your personalized natal chart based on your birth details
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Birth Information
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              For accurate results, please provide your exact birth time and location.
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="birthDate"
                  label="Birth Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.birthDate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="birthTime"
                  label="Birth Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={formData.birthTime}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <Schedule sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="birthPlace"
                  label="Birth Place (City, Country)"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="e.g., New York, USA"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
            </Grid>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={generateChart}
              disabled={!formData.birthDate || !formData.birthTime || !formData.birthPlace || loading}
              sx={{ mt: 3, py: 1.5 }}
              startIcon={<Star />}
            >
              {loading ? 'Generating Chart...' : 'Generate Birth Chart'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {chart ? (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Your Birth Chart
                </Typography>

                {/* Big Three */}
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    The Big Three
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                        <Typography variant="subtitle2">Sun Sign</Typography>
                        <Typography variant="h6" fontWeight={600}>{chart.sunSign}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
                        <Typography variant="subtitle2">Moon Sign</Typography>
                        <Typography variant="h6" fontWeight={600}>{chart.moonSign}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                        <Typography variant="subtitle2">Rising Sign</Typography>
                        <Typography variant="h6" fontWeight={600}>{chart.risingSign}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                {/* Planetary Positions */}
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Planetary Positions
                  </Typography>
                  <Grid container spacing={1}>
                    {chart.planets.map((planet, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {planet.name}
                          </Typography>
                          <Box>
                            <Chip label={planet.sign} size="small" sx={{ mr: 0.5 }} />
                            <Chip label={planet.house} size="small" variant="outlined" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Houses */}
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    House Cusps
                  </Typography>
                  <Grid container spacing={1}>
                    {chart.houses.map((house, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {house.number} House - {house.sign}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {house.meaning}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
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
              <Star sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Your Chart Awaits
              </Typography>
              <Typography color="text.secondary">
                Enter your birth details to generate your personalized natal chart
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Information Section */}
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}>
          Understanding Your Birth Chart
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="primary.main" gutterBottom>
                Sun Sign
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your core identity, ego, and life purpose. Represents your conscious self and how you express your individuality.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="secondary.main" gutterBottom>
                Moon Sign
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your emotional nature, instincts, and subconscious. Governs your inner world and how you process feelings.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="success.main" gutterBottom>
                Rising Sign
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your outer personality and first impressions. How others perceive you and your approach to new situations.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BirthChart;