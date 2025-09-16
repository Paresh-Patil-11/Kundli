import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { ContactMail, Send, Email, Phone, LocationOn } from '@mui/icons-material';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
        severity: 'success',
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          <ContactMail sx={{ mr: 2, fontSize: 'inherit' }} />
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Have questions about astrology or need guidance? We're here to help!
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Send us a Message
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="message"
                    label="Your Message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Tell us how we can help you on your cosmic journey..."
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Send />}
                disabled={loading}
                sx={{ mt: 3, px: 4, py: 1.5 }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Contact Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Get in Touch
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        hello@cosmicinsights.com
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        +1 (555) 123-4567
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="body1">
                        123 Cosmic Avenue<br />
                        Starlight City, SC 12345
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* FAQ */}
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Frequently Asked Questions
                  </Typography>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      How accurate are the horoscopes?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our horoscopes are crafted by experienced astrologers using traditional techniques and current planetary movements.
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      Can I get a personal reading?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Yes! Contact us to schedule a personalized astrology consultation with our expert astrologers.
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      How often are horoscopes updated?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Daily horoscopes are updated every morning, while weekly and monthly readings are published according to schedule.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Services Section */}
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="primary.main" gutterBottom>
                Personal Consultations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                One-on-one astrology readings tailored to your specific questions and birth chart analysis.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="secondary.main" gutterBottom>
                Relationship Compatibility
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed compatibility analysis for couples, including synastry and composite chart readings.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" color="success.main" gutterBottom>
                Career Guidance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Astrological insights into your career path, timing for major decisions, and professional strengths.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;