import React, { useEffect, useContext } from "react";
import { auth } from "../../index";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import classes from "../../assets/css/layout.module.css"
import AuthContext from "../context/AuthContext";

const AuthCheck = () => {
    const { authUser, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function handleMenuClick(path) {
    return function () {
      navigate(path);
    };
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
        console.log("signed out")
    }).catch(error => console.log(error))
  }
return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          > {authUser ? (
            <Avatar className={classes.avatar} sx={{ width: 32, height: 32 }}>{Array.from(authUser.email)[0]}</Avatar>
          ): (
            <Avatar sx={{ width: 32, height: 32 }}/>
          )}
            
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {authUser ? (
        <div>
           <MenuItem onClick={handleClose}>
           <Avatar className={classes.avatar} sx={{ width: 32, height: 32 }}>{Array.from(authUser.email)[0]}</Avatar> {authUser.email}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Edit account
        </MenuItem>
        <MenuItem onClick={handleClose && handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </div>
      ) : (
        <div>
         <MenuItem onClick={handleClose}>
          <Avatar /> Not signed in
        </MenuItem>
        <Divider />
        <MenuItem  onClick={handleClose && handleMenuClick("/signin")}>
          <ListItemIcon>
            <LoginIcon fontSize="small"/>
          </ListItemIcon>
          Log in
        </MenuItem>
        <MenuItem onClick={handleClose && handleMenuClick("/signup")}>
          <ListItemIcon>
          <PersonAdd fontSize="small" />
          </ListItemIcon>
          Sign up
        </MenuItem>
       </div>
      )}
       
      </Menu>
    </React.Fragment>
);
//   return (
//     <div>
//       {authUser ? (
//         <>
//           <p> signed in as {authUser.email}</p>
//           <Button onClick={handleSignOut} variant="contained" color="primary">Sign out</Button>
//         </>
//       ) : (
//         <p>not signed in</p>
//       )}
//     </div>
//   );
};

export default AuthCheck;


