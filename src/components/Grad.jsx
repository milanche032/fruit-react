import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from "uuid";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Grad() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCity, setNewCity] = useState({
    district_id: "",
    district_name: "",
    name: "",
    logo: "",
    area: "",
    population: "",
    longitude: "",
    latitude: "",
  });
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(), "cities");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(Object.values(data));
    });

    const districtsRef = ref(getDatabase(), "districts");
    onValue(districtsRef, (snapshot) => {
      const data = snapshot.val();
      setDistricts(Object.values(data));
    });
  }, []);

  const handleNewCityChange = (event) => {
    setNewCity({
      ...newCity,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewCitySubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase(), "cities");
    const newCityId = uuidv4();
    push(dbRef, { ...newCity, id: newCityId });
    setModalVisible(false);
  };

  const handleDistrictSelect = (event) => {
    const selectedDistrict = districts.find(
      (district) => district.id === event.target.value
    );
    setNewCity({
      ...newCity,
      district_id: event.target.value,
      district_name: selectedDistrict ? selectedDistrict.name : "",
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setModalVisible(true)}>
        Add new city
      </Button>
      <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
      <Dialog open={modalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>Add new city</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={newCity.district_id}
              onChange={handleDistrictSelect}
              label="District"
            >
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="District Name"
            name="district_name"
            disabled
            value={newCity.district_name}
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newCity.name}
            onChange={handleNewCityChange}
          />
          <TextField
            fullWidth
            label="Logo"
            name="logo"
            value={newCity.logo}
            onChange={handleNewCityChange}
          />
          <TextField
            fullWidth
            label="Area"
            name="area"
            type="number"
            value={newCity.area}
            onChange={handleNewCityChange}
          />
          <TextField
            fullWidth
            label="Population"
            name="population"
            type="number"
            value={newCity.population}
            onChange={handleNewCityChange}
          />
          <TextField
            fullWidth
            label="Longitude"
            name="longitude"
            value={newCity.longitude}
            onChange={handleNewCityChange}
          />
          <TextField
            fullWidth
            label="Latitude"
            name="latitude"
            value={newCity.latitude}
            onChange={handleNewCityChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVisible(false)}>Cancel</Button>
          <Button onClick={handleNewCitySubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>District Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Latitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.district_name}</TableCell>
                <TableCell>{item.logo}</TableCell>
                <TableCell>{item.area}</TableCell>
                <TableCell>{item.population}</TableCell>
                <TableCell>{item.longitude}</TableCell>
                <TableCell>{item.latitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Grad;
