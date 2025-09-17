import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { mysticalTheme } from './theme/mysticalTheme';
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
import Appointments from './pages/Appointments';

function App() {
  return (
    <ThemeProvider theme={mysticalTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
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
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } 
              />
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