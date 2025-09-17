import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Schedule, Star, VideoCall, Phone } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const consultationTypes = [
  { value: 'birth-chart', label: 'Birth Chart Reading', duration: 60, price: 99 },
  { value: 'compatibility', label: 'Relationship Compatibility', duration: 45, price: 79 },
  { value: 'career', label: 'Career Guidance', duration: 30, price: 59 },
  { value: 'general', label: 'General Reading', duration: 30, price: 49 },
];

const Appointments = () => {
  const { user, isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    consultationType: '',
    scheduledTime: new Date(),
    zodiacSign: '',
    notes: '',
    preferredMethod: 'video',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Mock data for demonstration
      setAppointments([
        {
          id: 1,
          consultationType: 'birth-chart',
          scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          zodiacSign: 'leo',
          status: 'confirmed',
          notes: 'Looking for career guidance',
          preferredMethod: 'video',
        },
      ]);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/appointments', formData);
      
      setSnackbar({
        open: true,
        message: 'Appointment scheduled successfully! You will receive a confirmation email.',
        severity: 'success',
      });
      
      setDialogOpen(false);
      setFormData({
        consultationType: '',
        scheduledTime: new Date(),
        zodiacSign: '',
        notes: '',
        preferredMethod: 'video',
      });
      
      fetchAppointments();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to schedule appointment. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getConsultationDetails = (type) => {
    return consultationTypes.find(c => c.value === type) || consultationTypes[0];
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
          <Schedule sx={{ mr: 2, fontSize: 'inherit' }} />
          Mystical Consultations
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Book personalized astrology sessions with our expert mystics
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Consultation Types */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Available Consultations
              </Typography>
              <Button
                variant="contained"
                startIcon={<Star />}
                onClick={() => setDialogOpen(true)}
                sx={{ px: 3 }}
              >
                Book Session
              </Button>
            </Box>

            <Grid container spacing={3}>
              {consultationTypes.map((consultation) => (
                <Grid item xs={12} sm={6} key={consultation.value}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, consultationType: consultation.value }));
                      setDialogOpen(true);
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {consultation.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Duration: {consultation.duration} minutes
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={`$${consultation.price}`}
                          color="secondary"
                          sx={{ fontWeight: 600, fontSize: '1rem' }}
                        />
                        <Button size="small" variant="outlined">
                          Select
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* My Appointments */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              My Appointments
            </Typography>
            
            {appointments.length > 0 ? (
              <Grid container spacing={3}>
                {appointments.map((appointment) => {
                  const details = getConsultationDetails(appointment.consultationType);
                  return (
                    <Grid item xs={12} key={appointment.id}>
                      <Card>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                {details.label}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(appointment.scheduledTime).toLocaleString()}
                              </Typography>
                            </Box>
                            <Chip
                              label={appointment.status}
                              color={getStatusColor(appointment.status)}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                              label={appointment.zodiacSign}
                              size="small"
                              variant="outlined"
                              sx={{ textTransform: 'capitalize' }}
                            />
                            <Chip
                              label={`${details.duration} min`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={appointment.preferredMethod === 'video' ? <VideoCall /> : <Phone />}
                              label={appointment.preferredMethod}
                              size="small"
                              variant="outlined"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </Box>
                          
                          {appointment.notes && (
                            <Typography variant="body2" color="text.secondary">
                              Notes: {appointment.notes}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Box textAlign="center" py={4}>
                <Star sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No appointments scheduled
                </Typography>
                <Typography color="text.secondary">
                  Book your first mystical consultation to begin your cosmic journey
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Why Choose Our Consultations?
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                'Expert astrologers with 10+ years experience',
                'Personalized readings based on your birth chart',
                'Flexible scheduling and consultation methods',
                'Detailed follow-up reports included',
                '100% satisfaction guarantee',
              ].map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Star sx={{ color: 'secondary.main', mr: 1, fontSize: '1rem' }} />
                  <Typography variant="body2">{benefit}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Consultation Methods
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VideoCall sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>Video Call</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Face-to-face consultation via Zoom
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>Phone Call</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Traditional voice consultation
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Book Your Mystical Consultation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Consultation Type"
                  value={formData.consultationType}
                  onChange={(e) => handleChange('consultationType', e.target.value)}
                  required
                >
                  {consultationTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label} - ${type.price} ({type.duration} min)
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Your Zodiac Sign"
                  value={formData.zodiacSign}
                  onChange={(e) => handleChange('zodiacSign', e.target.value)}
                  required
                >
                  {zodiacSigns.map((sign) => (
                    <MenuItem key={sign} value={sign.toLowerCase()}>
                      {sign}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <DateTimePicker
                  label="Preferred Date & Time"
                  value={formData.scheduledTime}
                  onChange={(newValue) => handleChange('scheduledTime', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDateTime={new Date()}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Preferred Method"
                  value={formData.preferredMethod}
                  onChange={(e) => handleChange('preferredMethod', e.target.value)}
                >
                  <MenuItem value="video">Video Call</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes (Optional)"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any specific questions or areas you'd like to focus on..."
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.consultationType || !formData.zodiacSign}
            startIcon={<Schedule />}
          >
            {loading ? 'Booking...' : 'Book Consultation'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Appointments;