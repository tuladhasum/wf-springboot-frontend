import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GridOnIcon from '@mui/icons-material/GridOn';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DRAWER_WIDTH = 220;
const DRAWER_COLLAPSED = 60;

const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: <HomeIcon /> },
  { label: 'Data Grid', to: '/grid', icon: <GridOnIcon /> },
];

/**
 * Application shell: top AppBar + collapsible side drawer + <Outlet />.
 * All pages are rendered inside the Outlet.
 */
export default function AppShell() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);

  const drawerWidth = open ? DRAWER_WIDTH : DRAWER_COLLAPSED;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* ── Top AppBar ── */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'primary.main' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen((v) => !v)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            WF App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ── Side Drawer ── */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar /> {/* spacer below AppBar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
          {!isMobile && (
            <IconButton size="small" onClick={() => setOpen((v) => !v)}>
              <ChevronLeftIcon
                sx={{
                  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </IconButton>
          )}
        </Box>

        <List dense>
          {NAV_ITEMS.map(({ label, to, icon }) => (
            <Tooltip key={to} title={open ? '' : label} placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={to}
                  end={to === '/'}
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                    '&.active': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto' }}>
                    {icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={label} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* ── Main content ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
