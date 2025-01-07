import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dashboard, ManageAccounts, Widgets, Addchart, Logout } from "@mui/icons-material";
import { useCompanyStore } from "../store/companyDataStore";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));  // Check if screen size is small
  const { companyData } = useCompanyStore();

  // Toggle drawer open and close on small screens
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Manage Campaign", icon: <ManageAccounts />, path: "/manage-campaigns" },
    { text: "Features", icon: <Widgets />, path: "/features" },
    { text: "Reports", icon: <Addchart />, path: "/reports" },
    { text: "Recent Activities", icon: <Addchart />, path: "/recent-activities" },
    { text: "Logout", icon: <Logout />, path: "/login" },
  ];

  return (
    <>
      {/* Hamburger Menu Icon for Small Screens */}
      {isSmallScreen && (
        <IconButton onClick={toggleDrawer} sx={{ color: 'black', position: 'absolute', top: 10, left: 10 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}  // Adjust the drawer behavior based on screen size
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          width: { xs: "60%", sm: "30%", md: "25%", lg: "16%" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "60%", sm: "30%", md: "25%", lg: "16%" },
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",  // Light gray background for the sidebar
            padding: "0.5%",
            color: "#333",  // Dark gray text for readability
          },
        }}
      >
        <Toolbar>
          <Typography sx={{ fontSize: 20, color: "#333", fontWeight: "bold" }}>
            {companyData ? `${companyData.companyName} Portal` : "Company Portal"}
          </Typography>
        </Toolbar>
        <Divider sx={{ backgroundColor: "#ccc" }} />  {/* Light gray divider */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              sx={{
                padding: "8px 16px",
                "&:hover": { backgroundColor: "#e0e0e0" },  // Slightly darker hover effect
                "&.Mui-selected": {
                  backgroundColor: "#c0c0c0",  // A little darker when selected
                  "&:hover": { backgroundColor: "#b0b0b0" },
                },
                borderRadius: 4,
                marginTop: "5%",
              }}
              onClick={() => {
                navigate(item.path);
                if (isSmallScreen) setOpenDrawer(false); // Close the drawer on small screens after navigation
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "#333" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#333",  // Dark text for readability
                  fontSize: { xs: 14, sm: 16, md: 18 },
                }}
                primary={item.text}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
