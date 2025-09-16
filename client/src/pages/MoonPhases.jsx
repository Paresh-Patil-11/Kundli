import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  LinearProgress,
} from '@mui/material';
import { NightsStay, Brightness1, Brightness2, Brightness3 } from '@mui/icons-material';

const MoonPhases = () => {
  const [currentPhase, setCurrentPhase] = useState(null);
  const [upcomingPhases, setUpcomingPhases] = useState([]);

  useEffect(() => {
    // Mock moon phase data (in a real app, this would come from an astronomy API)
    const mockCurrentPhase = {
      name: 'Waxing Gibbous',
      illumination: 78,
      date: new Date(),
      description: 'The moon is growing brighter and will soon be full. This is a time of building energy and manifestation.',
      energy: 'Building, Growing, Manifesting',
      bestFor: ['Goal setting', 'Taking action', 'Building momentum'],
    };

    const mockUpcomingPhases = [
      {
        name: 'Full Moon',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        icon: <Brightness1 />,
        description: 'Peak lunar energy, perfect for culmination and release.',
      },
      {
        name: 'Waning Gibbous',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        icon: <Brightness2 />,
        description: 'Time for gratitude, sharing wisdom, and letting go.',
      },
      {
        name: 'Last Quarter',
        date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
        icon: <Brightness3 />,
        description: 'Release what no longer serves, forgiveness, and healing.',
      },
      {
        name: 'New Moon',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        icon: <NightsStay />,
        description: 'New beginnings, setting intentions, and planting seeds.',
      },
    ];

    setCurrentPhase(mockCurrentPhase);
    setUpcomingPhases(mockUpcomingPhases);
  }, []);

  const getMoonIcon = (phaseName) => {
    switch (phaseName.toLowerCase()) {
      case 'new moon':
        return <NightsStay sx={{ fontSize: 60 }} />;
      case 'full moon':
        return <Brightness1 sx={{ fontSize: 60 }} />;
      case 'waxing gibbous':
      case 'waning gibbous':
        return <Brightness2 sx={{ fontSize: 60 }} />;
      default:
        return <Brightness3 sx={{ fontSize: 60 }} />;
    }
  };

  const getPhaseColor = (phaseName) => {
    switch (phaseName.toLowerCase()) {
      case 'new moon':
        return '#1a1a2e';
      case 'full moon':
        return '#f1c40f';
      case 'waxing gibbous':
        return '#3498db';
      case 'waning gibbous':
        return '#9b59b6';
      default:
        return '#95a5a6';
    }
  };

  if (!currentPhase) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography>Loading moon phase data...</Typography>
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
          <NightsStay sx={{ mr: 2, fontSize: 'inherit' }} />
          Moon Phases
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Track the lunar cycle and harness the moon's energy for your spiritual journey
        </Typography>
      </Box>

      {/* Current Moon Phase */}
      <Paper
        sx={{
          p: 4,
          mb: 6,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4} textAlign="center">
            <Box sx={{ color: getPhaseColor(currentPhase.name), mb: 2 }}>
              {getMoonIcon(currentPhase.name)}
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {currentPhase.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentPhase.date.toLocaleDateString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Box mb={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  Lunar Illumination
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {currentPhase.illumination}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={currentPhase.illumination}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {currentPhase.description}
            </Typography>

            <Box mb={2}>
              <Chip
                label={`Energy: ${currentPhase.energy}`}
                color="primary"
                sx={{ mr: 1, mb: 1 }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Best Activities:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {currentPhase.bestFor.map((activity, index) => (
                  <Chip
                    key={index}
                    label={activity}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Upcoming Phases */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Upcoming Moon Phases
      </Typography>
      
      <Grid container spacing={3}>
        {upcomingPhases.map((phase, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ color: getPhaseColor(phase.name), mb: 2 }}>
                  {phase.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {phase.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {phase.date.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {phase.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Moon Phase Guide */}
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
          Working with Moon Phases
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Waxing Phases (Growing Moon)
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>New Moon to Full Moon:</strong> Time for new beginnings, setting intentions, 
              taking action, and building momentum. Energy is increasing and expanding.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              <Chip label="New Projects" size="small" color="success" />
              <Chip label="Goal Setting" size="small" color="success" />
              <Chip label="Growth" size="small" color="success" />
              <Chip label="Manifestation" size="small" color="success" />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Waning Phases (Shrinking Moon)
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Full Moon to New Moon:</strong> Time for release, letting go, reflection, 
              and inner work. Energy is decreasing and turning inward.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip label="Release" size="small" color="warning" />
              <Chip label="Reflection" size="small" color="warning" />
              <Chip label="Healing" size="small" color="warning" />
              <Chip label="Forgiveness" size="small" color="warning" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MoonPhases;