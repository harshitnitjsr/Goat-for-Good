import { Box, IconButton, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button, colors, Popover, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    
    const [dialogOpen, setDialogOpen] =useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
      };
    
      const handleDialogClose = () => {
        setDialogOpen(false);
      };
      const handleLogout = () => {
        setTimeout(() => {
            signOut(auth);
          navigate("/");
        }, 1000);
    
        handleDialogClose();
      }

    const changeBackgroundColor = () => {
        if (theme.palette.mode === "dark") {
            document.body.style.backgroundColor = "#f5f5f5"; // Light mode background color
        } else {
            document.body.style.backgroundColor = "rgb(20, 27, 45)"; // Dark mode background color
        }
    };

    return (
        <Box display="flex" justifyContent="end" p={2} flexGrow={1} sx={{width:'100%'}}>
        {/* SEARCH BAR */}
        {/* <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
            </IconButton>
        </Box> */}

        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
            ) : (
                <LightModeOutlinedIcon />
            )}
            </IconButton>
            <IconButton>
            <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
            <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
            <PersonOutlinedIcon  />
            </IconButton>
        </Box>
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Logout</DialogTitle>
                <DialogContent>Are you sure you want to logout?</DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button color="error" onClick={handleLogout}>
                    Logout
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Topbar;