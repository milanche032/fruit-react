import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Okrug from "./components/Okrug";
import Grad from "./components/Grad";
import Opstina from "./components/Opstina";
import Layout from "./components/Layout";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SignpostIcon from "@mui/icons-material/Signpost";
import HomeIcon from "@mui/icons-material/Home";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import AuthContext from "./components/context/AuthContext";

export const menuItems = [
  {
    name: "Početna",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    name: "Okrug",
    icon: <SignpostIcon />,
    path: "/okrug",
  },
  {
    name: "Grad",
    icon: <ApartmentIcon />,
    path: "/grad",
  },
  {
    name: "Opština",
    icon: <MapsHomeWorkIcon />,
    path: "/opstina",
  },
];

function App() {
  const [authUser, setAuthUser] = useState(null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/okrug" element={<Okrug />} />
            <Route path="/grad" element={<Grad />} />
            <Route path="/opstina" element={<Opstina />} />
          </Routes>
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
