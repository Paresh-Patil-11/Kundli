import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Home,
  AutoAwesome,
  Psychology,
  Favorite,
  Timeline,
  NightsStay,
  Style,
  Casino,
  Article,
  ContactMail,
  AdminPanelSettings,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Horoscopes', path: '/horoscopes', icon: <AutoAwesome /> },
    { text: 'Zodiac Signs', path: '/zodiac', icon: <Psychology /> },
    { text: 'Compatibility', path: '/compatibility', icon: <Favorite /> },
    { text: 'Birth Chart', path: '/birth-chart', icon: <Timeline /> },
    { text: 'Moon Phases', path: '/moon-phases', icon: <NightsStay /> },
    { text: 'Tarot Reading', path: '/tarot', icon: <Style /> },
    { text: 'Lucky Numbers', path: '/lucky-numbers', icon: <Casino /> },
    { text: 'Appointments', path: '/appointments', icon: <ContactMail /> },
    { text: 'Blog', path: '/blog', icon: <Article /> },
    { text: 'Contact', path: '/contact', icon: <ContactMail /> },
  ];

  if (isAdmin) {
    menuItems.push({ text: 'Admin Panel', path: '/admin', icon: <AdminPanelSettings /> });
  }

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            <Box sx={{ mr: 2 }}>{item.icon}</Box>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(26, 26, 46, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              background: 'linear-gradient(45deg, #FFD700, #FFD369)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              fontSize: '1.8rem',
              fontFamily: '"Cinzel", serif',
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              filter: 'drop-shadow(0 0 10px #FFD700)',
            }}
          >
            🔮 KundliVision
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.slice(0, 6).map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      color: '#FFD700',
                      textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {isAuthenticated ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  Welcome, {user?.firstName}!
                </MenuItem>
                {isAdmin && (
                  <MenuItem component={Link} to="/admin" onClick={handleClose}>
                    Admin Panel
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                variant="outlined"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;