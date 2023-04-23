import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
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
  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'text',
    },
    {
      name: 'area',
      label: 'Area',
      type: 'number',
    },
    {
      name: 'population',
      label: 'Population',
      type: 'number',
    },
    {
      name: 'longitude',
      label: 'Longitude',
      type: 'text',
    },
    {
      name: 'latitude',
      label: 'Latitude',
      type: 'text',
    },
  ];
  
  useEffect(() => {
    const dbRef = ref(getDatabase(), "cities");
    console.log(dbRef);
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
    const dbRef = ref(getDatabase(), `cities/${editCity.id}`);
    set(dbRef, { ...editCity });
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
      <Dialog open={modalVisible || editModalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>
          {editModalVisible ? "Edit city" : "Add new city"}
        </DialogTitle>
        <DialogContent>
        <FormControl fullWidth>
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={
                editModalVisible ? editCity.district_id : newCity.district_id
              }
              onChange={
                editModalVisible ? handleEditCityChange : handleDistrictSelect
              }
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
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              value={
                editModalVisible ? editCity[field.name] : newCity[field.name]
              }
              onChange={
                editModalVisible ? handleEditCityChange : handleNewCityChange
              }
            />
          ))}
          
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setModalVisible(false) || setEditModalVisible(false)}>Cancel</Button>
          <Button
            onClick={
              editModalVisible ? handleEditCitySubmit : handleNewCitySubmit
            }
          >
            {editModalVisible ? "Save" : "Add"}
          </Button>
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
