import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const mysticalFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    filter: drop-shadow(0 0 20px #FFD700);
  }
  50% { 
    transform: translateY(-30px) rotate(180deg); 
    filter: drop-shadow(0 0 40px #FFD369);
  }
`;

const mysticalSparkle = keyframes`
  0%, 100% { 
    opacity: 0; 
    transform: scale(0) rotate(0deg); 
    filter: drop-shadow(0 0 5px #FFD700);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.5) rotate(360deg); 
    filter: drop-shadow(0 0 15px #FFD369);
  }
`;

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #4B0082 0%, #191970 50%, #000000 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
    animation: `${mysticalSparkle} 3s ease-in-out infinite`,
  },
}));

const FloatingIcon = styled(Box)({
  animation: `${mysticalFloat} 4s ease-in-out infinite`,
  fontSize: '6rem',
  marginBottom: '2rem',
  background: 'linear-gradient(45deg, #FFD700, #FFD369)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 0 30px #FFD700)',
});

const Sparkle = styled(Box)(({ delay }) => ({
  position: 'absolute',
  width: '6px',
  height: '6px',
  background: 'linear-gradient(45deg, #FFD700, #FFD369)',
  borderRadius: '50%',
  animation: `${mysticalSparkle} 3s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  filter: 'drop-shadow(0 0 10px #FFD700)',
}));

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <StyledBox>
      {/* Animated sparkles */}
      {[...Array(30)].map((_, i) => (
        <Sparkle
          key={i}
          delay={i * 0.1}
          sx={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      <FloatingIcon>
        🔮
      </FloatingIcon>
      
      <CircularProgress
        size={80}
        thickness={6}
        sx={{
          color: '#FFD700',
          marginBottom: 3,
          filter: 'drop-shadow(0 0 20px #FFD700)',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      
      <Typography
        variant="h6"
        sx={{
          background: 'linear-gradient(45deg, #FFD700, #FFD369)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
          fontSize: '1.5rem',
          textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
          fontFamily: '"Cinzel", serif',
        }}
      >
        {message}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: '#F5F5DC',
          marginTop: 2,
          fontStyle: 'italic',
          opacity: 0.8,
        }}
      >
        Connecting with the cosmic energies...
      </Typography>
    </StyledBox>
  );
};

export default LoadingScreen;