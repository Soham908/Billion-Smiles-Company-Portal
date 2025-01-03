import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Addchart, Logout, ManageAccounts, Dashboard, Widgets } from '@mui/icons-material';
import { useCompanyStore } from '../store/companyDataStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const { companyData } = useCompanyStore()

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Manage Campaign', icon: <ManageAccounts />, path: '/manage-campaigns' },
    { text: 'Features', icon: <Widgets />, path: '/features' },
    { text: 'Reports', icon: <Addchart />, path: '/reports' },
    { text: 'Logout', icon: <Logout />, path: '/login' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f4f4f4',
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: 'bold', textAlign: 'center' }}
      >
        {companyData ? companyData.companyName + " Portal" : "Company Portal" }
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
