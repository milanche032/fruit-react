import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { auth } from "../../index";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleRedirect(path) {
    return function () {
      navigate(path);
    };
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => console.log(error));
      handleRedirect("/")
  };
  return (
    <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sm={6}>
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
    <Grid item xs={12} sm={6}>
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
      <Button type="submit" variant="contained" onClick={handleSignUp}>
        Sign Up
      </Button>
    </Grid>
  </Grid>
  );
};

export default SignUp;
