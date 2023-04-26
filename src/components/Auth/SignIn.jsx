import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { auth } from "../../index";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import classes from "../../assets/css/auth.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); // added state for error
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(true); // set error state to true if there is an error
      });
  };
  return (
    <Paper className={classes.loginPaper} elevation={3}>
      <Typography variant="h2" align="center" color="initial">Prijavite se</Typography>
      <form onSubmit={handleSignIn}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12}>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              fullWidth 
              type="submit" 
              size="large" 
              variant="contained"
            >
              Sign In
            </Button>
          </Grid>
          {error && ( // show error message if error state is true
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="error">
                Wrong credentials. Please try again.
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default SignIn;