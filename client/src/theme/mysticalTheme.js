import { createTheme } from '@mui/material/styles';

// Mystical color palette
const colors = {
  deepNavy: '#0A0A40',
  black: '#000000',
  purple: '#4B0082',
  midnightBlue: '#191970',
  darkPurple: '#2E0854',
  charcoalBlack: '#1C1C1C',
  silver: '#C0C0C0',
  gold: '#FFD700',
  cream: '#F5F5DC',
  softSilver: '#D9D9D9',
  royalPurple: '#6A0DAD',
  navyBlue: '#001F54',
  goldHover: '#FFD369',
};

export const mysticalTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.royalPurple,
      light: colors.goldHover,
      dark: colors.navyBlue,
      contrastText: colors.cream,
    },
    secondary: {
      main: colors.gold,
      light: colors.goldHover,
      dark: '#B8860B',
      contrastText: colors.black,
    },
    background: {
      default: colors.black,
      paper: colors.darkPurple,
    },
    text: {
      primary: colors.cream,
      secondary: colors.softSilver,
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    divider: colors.silver,
  },
  typography: {
    fontFamily: '"Cinzel", "Playfair Display", "Georgia", serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      color: colors.gold,
      textShadow: `0 0 20px ${colors.goldHover}`,
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: colors.gold,
      textShadow: `0 0 15px ${colors.goldHover}`,
      letterSpacing: '0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: colors.gold,
      textShadow: `0 0 10px ${colors.goldHover}`,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: colors.cream,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: colors.cream,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: colors.cream,
    },
    body1: {
      color: colors.softSilver,
      lineHeight: 1.7,
    },
    body2: {
      color: colors.softSilver,
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.midnightBlue} 50%, ${colors.black} 100%)`,
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.gold} ${colors.darkPurple}`,
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: colors.darkPurple,
        },
        '*::-webkit-scrollbar-thumb': {
          background: colors.gold,
          borderRadius: '4px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(90deg, ${colors.deepNavy} 0%, ${colors.black} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.silver}`,
          boxShadow: `0 4px 20px rgba(255, 215, 0, 0.3)`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.charcoalBlack} 100%)`,
          border: `1px solid ${colors.silver}`,
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 20px 40px rgba(255, 215, 0, 0.4), 0 0 30px rgba(106, 13, 173, 0.6)`,
            border: `2px solid ${colors.gold}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.charcoalBlack} 100%)`,
          border: `1px solid ${colors.silver}`,
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 24px',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${colors.goldHover}, transparent)`,
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: `linear-gradient(45deg, ${colors.royalPurple} 0%, ${colors.navyBlue} 100%)`,
          color: colors.cream,
          boxShadow: `0 8px 25px rgba(106, 13, 173, 0.4)`,
          '&:hover': {
            background: `linear-gradient(45deg, ${colors.navyBlue} 0%, ${colors.royalPurple} 100%)`,
            boxShadow: `0 12px 35px rgba(255, 215, 105, 0.6)`,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          border: `2px solid ${colors.gold}`,
          color: colors.gold,
          '&:hover': {
            border: `2px solid ${colors.goldHover}`,
            background: `rgba(255, 215, 0, 0.1)`,
            boxShadow: `0 0 20px rgba(255, 215, 0, 0.5)`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: `rgba(46, 8, 84, 0.3)`,
            borderRadius: '12px',
            '& fieldset': {
              borderColor: colors.silver,
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: colors.gold,
              boxShadow: `0 0 10px rgba(255, 215, 0, 0.3)`,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.gold,
              boxShadow: `0 0 15px rgba(255, 215, 0, 0.5)`,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.softSilver,
            '&.Mui-focused': {
              color: colors.gold,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: colors.cream,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: `linear-gradient(45deg, ${colors.royalPurple}, ${colors.navyBlue})`,
          color: colors.cream,
          border: `1px solid ${colors.silver}`,
          fontWeight: 600,
          '&:hover': {
            background: `linear-gradient(45deg, ${colors.navyBlue}, ${colors.royalPurple})`,
            boxShadow: `0 0 15px rgba(255, 215, 0, 0.4)`,
          },
        },
        outlined: {
          background: 'transparent',
          border: `2px solid ${colors.gold}`,
          color: colors.gold,
          '&:hover': {
            background: `rgba(255, 215, 0, 0.1)`,
            boxShadow: `0 0 10px rgba(255, 215, 0, 0.3)`,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '8px',
          borderRadius: '4px',
          background: colors.charcoalBlack,
        },
        bar: {
          background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldHover})`,
          borderRadius: '4px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            color: colors.softSilver,
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            '&.Mui-selected': {
              color: colors.gold,
              textShadow: `0 0 10px ${colors.goldHover}`,
            },
          },
          '& .MuiTabs-indicator': {
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldHover})`,
            height: '3px',
            borderRadius: '2px',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `linear-gradient(180deg, ${colors.deepNavy} 0%, ${colors.black} 100%)`,
          borderRight: `1px solid ${colors.silver}`,
        },
      },
    },
  },
});

export default mysticalTheme;