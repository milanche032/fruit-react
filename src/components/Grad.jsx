import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { Link } from "react-router-dom";
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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newCity, setNewCity] = useState({
    district_id: "",
    name: "",
    logo: "",
    area: "",
    population: "",
    longitude: "",
    latitude: "",
  });
  const [editCity, setEditCity] = useState({
    id: "",
    district_id: "",
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
    if (newCity.id) {
      const cityRef = ref(dbRef, newCity.id);
      set(cityRef, { ...newCity });
    } else {
      const newCityRef = push(dbRef);
      set(newCityRef, { ...newCity, id: newCityRef.key });
    }
    setNewCity({
      // reset the new city form
      district_id: "",
      name: "",
      logo: "",
      area: "",
      population: "",
      longitude: "",
      latitude: "",
    });
    setModalVisible(false);
  };

  const handleEditCityChange = (event) => {
    setEditCity({
      ...editCity,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditCitySubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase(), "cities");
    const cityRef = ref(dbRef, editCity.id);
    set(cityRef, { ...editCity });
    setEditCity({
      // reset the edit city form
      id: "",
      district_id: "",
      name: "",
      logo: "",
      area: "",
      population: "",
      longitude: "",
      latitude: "",
    });
    setEditModalVisible(false);
  };

  const handleDistrictSelect = (event) => {
    setNewCity({
      ...newCity,
      district_id: event.target.value,
    });
  };

  const handleEdit = (item) => {
    setEditCity({
      ...item,
    });
    setEditModalVisible(true);
  };

  const handleDelete = (id) => {
    const dbRef = ref(getDatabase(), `cities/${id}`);
    set(dbRef, null); // remove the item from the database
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
      <Dialog
        open={editModalVisible}
        onClose={() => setEditModalVisible(false)}
      >
        <DialogTitle>Edit city</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={editCity.district_id}
              onChange={handleEditCityChange}
              name="district_id"
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
            label="Name"
            name="name"
            value={editCity.name}
            onChange={handleEditCityChange}
          />
          <TextField
            fullWidth
            label="Logo"
            name="logo"
            value={editCity.logo}
            onChange={handleEditCityChange}
          />
          <TextField
            fullWidth
            label="Area"
            name="area"
            type="number"
            value={editCity.area}
            onChange={handleEditCityChange}
          />
          <TextField
            fullWidth
            label="Population"
            name="population"
            type="number"
            value={editCity.population}
            onChange={handleEditCityChange}
          />
          <TextField
            fullWidth
            label="Longitude"
            name="longitude"
            value={editCity.longitude}
            onChange={handleEditCityChange}
          />
          <TextField
            fullWidth
            label="Latitude"
            name="latitude"
            value={editCity.latitude}
            onChange={handleEditCityChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
          <Button onClick={handleEditCitySubmit}>Save</Button>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {
                    districts.find(
                      (district) => district.id === item.district_id
                    )?.name
                  }
                </TableCell>
                <TableCell>{item.logo}</TableCell>
                <TableCell>{item.area}</TableCell>
                <TableCell>{item.population}</TableCell>
                <TableCell>{item.longitude}</TableCell>
                <TableCell>{item.latitude}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Grad;
