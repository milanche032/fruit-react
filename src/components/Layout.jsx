import React, { useContext } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../App";
import AuthCheck from "./Auth/AuthCheck";
import classes from "../assets/css/layout.module.css";
import AuthContext from "./context/AuthContext";

const drawerWidth = 240;

export default function Layout(props) {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleClick(path) {
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
              {menuItems.map((menuItem) => (
                <div>
                  <ListItem
                    button
                    onClick={handleClick(menuItem.path)}
                    key={menuItem.name}
                  >
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.name} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <List>
              <ListItem button onClick={handleClick("/signin")}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Log in" />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleClick("/signup")}>
                <ListItemIcon></ListItemIcon>
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
