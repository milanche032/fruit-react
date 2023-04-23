import * as React from "react";
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
import ApartmentIcon from "@mui/icons-material/Apartment";
import SignpostIcon from '@mui/icons-material/Signpost';
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const drawerWidth = 240;

export default function Layout(props) {
  const navigate = useNavigate();
  function handleClick(path) {
    return function () {
      navigate(path);
    };
  }
  const menuItems = [
    {
      name: "Početna",
      icon: <HomeIcon/>,
      path: "/",
    },
    {
      name: "Okrug",
      icon: <SignpostIcon/>,
      path: "/okrug",
    },
    {
      name: "Grad",
      icon: <ApartmentIcon/>,
      path: "/grad",
    },
    {
      name: "Opština",
      icon: <MapsHomeWorkIcon/>,
      path: "/opstina",
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Fruits
          </Typography>
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
          <List>
            {menuItems.map((menuItem) => (<div>
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
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
