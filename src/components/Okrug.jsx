import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
function Okrug() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newDistrict, setNewDistrict] = useState({
    name: "",
    map: "",
    area: "",
    population: "",
    headquarters: "",
    region: "",
  });
  const [editDistrict, setEditDistrict] = useState({
    id: "",
    name: "",
    map: "",
    area: "",
    population: "",
    headquarters: "",
    region: "",
  });
  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'map',
      label: 'Map',
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
      name: 'headquarters',
      label: 'Headquarters',
      type: 'text',
    },
    {
      name: 'region',
      label: 'Region',
      type: 'text',
    },
  ];

  useEffect(() => {
    const dbRef = ref(getDatabase(), "districts");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
     setData(Object.values(data)) ;
    });
  }, []);

  const handleNewDistrictChange = (event) => {
    setNewDistrict({
      ...newDistrict,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewDistrictSubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase(), "districts");
    if (newDistrict.id) {
      const districtRef = ref(dbRef, newDistrict.id);
      set(districtRef, { ...newDistrict });
    } else {
      const newDistrictRef = push(dbRef);
      set(newDistrictRef, { ...newDistrict, id: newDistrictRef.key });
    }
    setNewDistrict({
      name: "",
      map: "",
      area: "",
      population: "",
      headquarters: "",
      region: "",
    });
    setModalVisible(false);
  };
  const handleEditDistrictChange = (event) => {
    setEditDistrict({
      ...editDistrict,
      [event.target.name]: event.target.value,
    });
  };
  const handleEditDistrictSubmit = (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase(), `districts/${editDistrict.id}`);
    set(dbRef, { ...editDistrict });
    setEditDistrict({
      name: "",
      map: "",
      area: "",
      population: "",
      headquarters: "",
      region: "",
    });
    setEditModalVisible(false);
  };
  const handleEditDistrict = (item) => {
    setEditDistrict({
      ...item,
    });
    setEditModalVisible(true);
  };
  const handleDeleteDistrict = (id) => {
    const dbRef = ref(getDatabase(), `districts/${id}`);
    set(dbRef, null);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setModalVisible(true)}>
        Add new district
      </Button>
      <Dialog open={modalVisible || editModalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>
          {editModalVisible ? "Edit District" : "Add new District"}
        </DialogTitle>
        <DialogContent>
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              value={
                editModalVisible ? editDistrict[field.name] : newDistrict[field.name]
              }
              onChange={
                editModalVisible ? handleEditDistrictChange : handleNewDistrictChange
              }
            />
          ))}
         </DialogContent>
        <DialogActions>
        <Button onClick={() => setModalVisible(false) || setEditModalVisible(false)}>Cancel</Button>
          <Button
            onClick={
              editModalVisible ? handleEditDistrictSubmit : handleNewDistrictSubmit
            }
          >
            {editModalVisible ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      {data.length === 0 ? (
  <p>No data</p>
) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>mapa</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Headquarters</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.map}</TableCell>
                <TableCell>{item.area}</TableCell>
                <TableCell>{item.population}</TableCell>
                <TableCell>{item.headquarters}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditDistrict(item)}>
                    Edit
                  </Button>
                  <Button variant="outlined" onClick={() => handleDeleteDistrict(item.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
    </div>
  );
}

export default Okrug;
