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

function Opstina() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newMunicipality, setNewMunicipality] = useState({
    city_id: "",
    name: "",
    altitude: "",
    area: "",
    population: "",
    longitude: "",
    latitude: "",
  });
  const [editMunicipality, setEditMunicipality] = useState({
    id: "",
    city_id: "",
    name: "",
    altitude: "",
    area: "",
    population: "",
    longitude: "",
    latitude: "",
  });
  const [cities, setCities] = useState([]);
  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'altitude',
      label: 'Altitude',
      type: 'number',
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
    const dbRef = ref(getDatabase(), "municipalities");
    console.log(dbRef);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(Object.values(data));
    });

    const citiesRef = ref(getDatabase(), "cities");
    onValue(citiesRef, (snapshot) => {
      const data = snapshot.val();
      setCities(Object.values(data));
    });
  }, []);

  const handleNewMunicipalityChange = (event) => {
    setNewMunicipality({
      ...newMunicipality,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewMunicipalitySubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase(), "municipalities");
    if (newMunicipality.id) {
      const municipalityRef = ref(dbRef, newMunicipality.id);
      set(municipalityRef, { ...newMunicipality });
    } else {
      const newMunicipalityRef = push(dbRef);
      set(newMunicipalityRef, { ...newMunicipality, id: newMunicipalityRef.key });
    }
    setNewMunicipality({
      // reset the new municipality form
      city_id: "",
      name: "",
      altitude: "",
      area: "",
      population: "",
      longitude: "",
      latitude: "",
    });
    setModalVisible(false);
  };

  const handleEditMunicipalityChange = (event) => {
    setEditMunicipality({
      ...editMunicipality,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditMunicipalitySubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase(), `municipalities/${editMunicipality.id}`);
    set(dbRef, { ...editMunicipality });
    setEditMunicipality({
      // reset the edit municipality form
      id: "",
      city_id: "",
      name: "",
      altitude: "",
      area: "",
      population: "",
      longitude: "",
      latitude: "",
    });
    setEditModalVisible(false);
  };

  const handleCitySelect = (event) => {
    setNewMunicipality({
      ...newMunicipality,
      city_id: event.target.value,
    });
  };

  const handleEdit = (item) => {
    setEditMunicipality({
      ...item,
    });
    setEditModalVisible(true);
  };

  const handleDelete = (id) => {
    const dbRef = ref(getDatabase(), `municipalities/${id}`);
    set(dbRef, null); // remove the item from the database
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setModalVisible(true)}>
        Add new municipality
      </Button>
      <Dialog open={modalVisible || editModalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>
          {editModalVisible ? "Edit municipality" : "Add new municipality"}
        </DialogTitle>
        <DialogContent>
        <FormControl fullWidth>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={
                editModalVisible ? editMunicipality.city_id : newMunicipality.city_id
              }
              onChange={
                editModalVisible ? handleEditMunicipalityChange : handleCitySelect
              }
              name="city_id"
              label="City"
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
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
                editModalVisible ? editMunicipality[field.name] : newMunicipality[field.name]
              }
              onChange={
                editModalVisible ? handleEditMunicipalityChange : handleNewMunicipalityChange
              }
            />
          ))}
  
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVisible(false) || setEditModalVisible(false)}>Cancel</Button>
          <Button
            onClick={
              editModalVisible ? handleEditMunicipalitySubmit : handleNewMunicipalitySubmit
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
              <TableCell>City Name</TableCell>
              <TableCell>Altitude</TableCell>
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
                    cities.find(
                      (city) => city.id === item.city_id
                    )?.name
                  }
                </TableCell>
                <TableCell>{item.altitude}</TableCell>
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
  export default Opstina;