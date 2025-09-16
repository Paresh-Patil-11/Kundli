import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Horoscopes from './pages/Horoscopes';
import ZodiacSigns from './pages/ZodiacSigns';
import Compatibility from './pages/Compatibility';
import BirthChart from './pages/BirthChart';
import MoonPhases from './pages/MoonPhases';
import TarotReading from './pages/TarotReading';
import LuckyNumbers from './pages/LuckyNumbers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';

// Create cosmic theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#0f0f23',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #6366f1, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      background: 'linear-gradient(45deg, #6366f1, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(45deg, #6366f1, #ec4899)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5, #db2777)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App" style={{ 
            minHeight: '100vh',
            background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
          }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/horoscopes" element={<Horoscopes />} />
              <Route path="/zodiac" element={<ZodiacSigns />} />
              <Route path="/compatibility" element={<Compatibility />} />
              <Route path="/birth-chart" element={<BirthChart />} />
              <Route path="/moon-phases" element={<MoonPhases />} />
              <Route path="/tarot" element={<TarotReading />} />
              <Route path="/lucky-numbers" element={<LuckyNumbers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;