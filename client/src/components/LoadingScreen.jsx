import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.3) 0%, rgba(15, 15, 35, 0.9) 70%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}));

const FloatingIcon = styled(Box)({
  animation: `${float} 3s ease-in-out infinite`,
  fontSize: '4rem',
  marginBottom: '2rem',
});

const Sparkle = styled(Box)(({ delay }) => ({
  position: 'absolute',
  width: '4px',
  height: '4px',
  background: '#ffffff',
  borderRadius: '50%',
  animation: `${sparkle} 2s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <StyledBox>
      {/* Animated sparkles */}
      {[...Array(20)].map((_, i) => (
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
        ✨
      </FloatingIcon>
      
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: 'primary.main',
          marginBottom: 3,
        }}
      />
      
      <Typography
        variant="h6"
        sx={{
          background: 'linear-gradient(45deg, #6366f1, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
        }}
      >
        {message}
      </Typography>
    </StyledBox>
  );
};

export default LoadingScreen;