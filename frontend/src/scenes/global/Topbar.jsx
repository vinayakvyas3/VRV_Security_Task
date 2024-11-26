import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  // State to manage menu anchor
  const [menuAnchor, setMenuAnchor] = useState(null);
  
  // navigate hook for navigation
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    // Perform logout action here
    // For example: clear authentication token, reset user session, etc.

    // Redirect user to '/signup' route after logout
   navigate("/signin");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Person Icon with Logout Option */}
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        {/* Menu for Logout Option */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
