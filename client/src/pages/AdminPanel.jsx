import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AdminPanelSettings, Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const zodiacSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [horoscopes, setHoroscopes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Dialog states
  const [horoscopeDialog, setHoroscopeDialog] = useState({ open: false, data: null });
  const [blogDialog, setBlogDialog] = useState({ open: false, data: null });
  
  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (currentTab) {
        case 0:
          await fetchHoroscopes();
          break;
        case 1:
          await fetchBlogs();
          break;
        case 2:
          await fetchMessages();
          break;
        case 3:
          await fetchUsers();
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHoroscopes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/horoscopes');
      setHoroscopes(response.data);
    } catch (error) {
      // Mock data for demonstration
      setHoroscopes([
        {
          id: 1,
          zodiacSign: 'aries',
          type: 'daily',
          content: 'Today brings new opportunities for growth and adventure.',
          date: '2024-01-20',
          luckyNumber: 7,
          luckyColor: 'red',
          mood: 'energetic',
        },
      ]);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      // Mock data for demonstration
      setBlogs([
        {
          id: 1,
          title: 'Understanding Your Moon Sign',
          slug: 'understanding-moon-sign',
          content: 'Your moon sign reveals your emotional nature...',
          excerpt: 'Discover the hidden side of your personality',
          isPublished: true,
          publishedAt: '2024-01-15',
          tags: ['Moon Sign', 'Astrology'],
        },
      ]);
    }
  };

  const fetchMessages = async () => {
    // Mock data for demonstration
    setMessages([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question about birth chart',
        message: 'I would like to know more about my birth chart...',
        isRead: false,
        createdAt: '2024-01-20',
      },
    ]);
  };

  const fetchUsers = async () => {
    // Mock data for demonstration
    setUsers([
      {
        id: 1,
        username: 'johndoe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        zodiacSign: 'leo',
        isAdmin: false,
        isActive: true,
        createdAt: '2024-01-01',
      },
    ]);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSaveHoroscope = async (data) => {
    try {
      if (data.id) {
        await axios.put(`http://localhost:5000/api/horoscopes/${data.id}`, data);
        showSnackbar('Horoscope updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/horoscopes', data);
        showSnackbar('Horoscope created successfully');
      }
      setHoroscopeDialog({ open: false, data: null });
      fetchHoroscopes();
    } catch (error) {
      showSnackbar('Error saving horoscope', 'error');
    }
  };

  const handleDeleteHoroscope = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/horoscopes/${id}`);
      showSnackbar('Horoscope deleted successfully');
      fetchHoroscopes();
    } catch (error) {
      showSnackbar('Error deleting horoscope', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const horoscopeColumns = [
    { field: 'zodiacSign', headerName: 'Zodiac Sign', width: 120, renderCell: (params) => params.value.charAt(0).toUpperCase() + params.value.slice(1) },
    { field: 'type', headerName: 'Type', width: 100, renderCell: (params) => params.value.charAt(0).toUpperCase() + params.value.slice(1) },
    { field: 'content', headerName: 'Content', width: 300, renderCell: (params) => params.value.substring(0, 50) + '...' },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'luckyNumber', headerName: 'Lucky #', width: 80 },
    { field: 'luckyColor', headerName: 'Lucky Color', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            startIcon={<Edit />}
            onClick={() => setHoroscopeDialog({ open: true, data: params.row })}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleDeleteHoroscope(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const blogColumns = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'slug', headerName: 'Slug', width: 200 },
    { field: 'isPublished', headerName: 'Published', width: 100, type: 'boolean' },
    { field: 'publishedAt', headerName: 'Published Date', width: 150 },
    { field: 'tags', headerName: 'Tags', width: 200, renderCell: (params) => params.value?.join(', ') || '' },
  ];

  const messageColumns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'isRead', headerName: 'Read', width: 80, type: 'boolean' },
    { field: 'createdAt', headerName: 'Date', width: 150 },
  ];

  const userColumns = [
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 120 },
    { field: 'zodiacSign', headerName: 'Zodiac', width: 100 },
    { field: 'isAdmin', headerName: 'Admin', width: 80, type: 'boolean' },
    { field: 'isActive', headerName: 'Active', width: 80, type: 'boolean' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          <AdminPanelSettings sx={{ mr: 2, fontSize: 'inherit' }} />
          Admin Panel
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your astrology website content and users
        </Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Horoscopes" />
          <Tab label="Blog Posts" />
          <Tab label="Messages" />
          <Tab label="Users" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Horoscopes Tab */}
          {currentTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Horoscopes Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setHoroscopeDialog({ open: true, data: null })}
                >
                  Add Horoscope
                </Button>
              </Box>
              <DataGrid
                rows={horoscopes}
                columns={horoscopeColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                loading={loading}
              />
            </Box>
          )}

          {/* Blog Posts Tab */}
          {currentTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Blog Posts Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setBlogDialog({ open: true, data: null })}
                >
                  Add Blog Post
                </Button>
              </Box>
              <DataGrid
                rows={blogs}
                columns={blogColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                loading={loading}
              />
            </Box>
          )}

          {/* Messages Tab */}
          {currentTab === 2 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Contact Messages
              </Typography>
              <DataGrid
                rows={messages}
                columns={messageColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                loading={loading}
              />
            </Box>
          )}

          {/* Users Tab */}
          {currentTab === 3 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Users Management
              </Typography>
              <DataGrid
                rows={users}
                columns={userColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                loading={loading}
              />
            </Box>
          )}
        </Box>
      </Paper>

      {/* Horoscope Dialog */}
      <HoroscopeDialog
        open={horoscopeDialog.open}
        data={horoscopeDialog.data}
        onClose={() => setHoroscopeDialog({ open: false, data: null })}
        onSave={handleSaveHoroscope}
      />

      {/* Snackbar */}
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

// Horoscope Dialog Component
const HoroscopeDialog = ({ open, data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    zodiacSign: '',
    type: 'daily',
    content: '',
    date: new Date().toISOString().split('T')[0],
    luckyNumber: '',
    luckyColor: '',
    mood: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        zodiacSign: '',
        type: 'daily',
        content: '',
        date: new Date().toISOString().split('T')[0],
        luckyNumber: '',
        luckyColor: '',
        mood: '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {data ? 'Edit Horoscope' : 'Add New Horoscope'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              name="zodiacSign"
              label="Zodiac Sign"
              value={formData.zodiacSign}
              onChange={handleChange}
              required
            >
              {zodiacSigns.map((sign) => (
                <MenuItem key={sign} value={sign}>
                  {sign.charAt(0).toUpperCase() + sign.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              name="type"
              label="Type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="content"
              label="Content"
              multiline
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="date"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="luckyNumber"
              label="Lucky Number"
              type="number"
              value={formData.luckyNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="luckyColor"
              label="Lucky Color"
              value={formData.luckyColor}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="mood"
              label="Mood"
              value={formData.mood}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {data ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPanel;