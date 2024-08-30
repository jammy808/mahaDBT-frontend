// src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import {Flat, Heat, Nested} from '@alptugidin/react-circular-progress-bar'
import StudentProfileProgress from './CircularProgressBar';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false); // Close drawer after navigation on mobile
    }
  };

  const item = {
    py: 1,
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
  };

  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };

  const drawer = (
    <List disablePadding>

      

      <ListItem sx={{ ...item, ...itemCategory }}>
        <ListItemText>
          <Typography
            component={'h2'}
            sx={{
              fontFamily: 'Montserrat',
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Dashboard
          </Typography>
        </ListItemText>
      </ListItem>
      <Divider sx={{ backgroundColor: 'black' }} />

            <StudentProfileProgress></StudentProfileProgress>

      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to="/profile/dash"
          sx={item}
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#133680' : '',
            color: isActive ? 'white' : 'white',
          })}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>


      {/* Add more navigation items here */}
    </List>
  );

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="black"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ color: 'white' }}>
            Website Name or Something
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'black',
            padding: '16px',
          },
        }}
      >
        {drawer}
    </Drawer>
      </nav>
      <main style={{ flexGrow: 1, padding: '80px 20px 20px 20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
