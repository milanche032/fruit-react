import React, { useContext } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItemButton,
  Divider,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../App";
import AuthCheck from "./Auth/AuthCheck";
import classes from "../assets/css/layout.module.css";
import AuthContext from "./context/AuthContext";
import PersonAdd from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

export default function Layout(props) {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setOpen(!open);
  };
  function handleRedirect(path) {
    return function () {
      navigate(path);
    };
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap component="div">
            Fruits
          </Typography>
          <AuthCheck />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {authUser ? (
            <List>
              <ListItem button onClick={handleRedirect("/")}>
                <ListItemIcon>
                <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Početna" />
              </ListItem>
              <ListItemButton onClick={handleMenuClick}>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Unos podataka" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menuItems.map((menuItem) => (
                    <div>
                      <ListItem
                        button
                        onClick={handleRedirect(menuItem.path)}
                        key={menuItem.name}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.name} />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Collapse>
            </List>
          ) : (
            <List>
              <ListItem button onClick={handleRedirect("/signin")}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Log in" />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleRedirect("/signup")}>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Sign up" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
