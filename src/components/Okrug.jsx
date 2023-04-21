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
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

function Okrug() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDistrict, setNewDistrict] = useState({
    name: "",
    map: "",
    area: "",
    population: "",
    headquarters: "",
    region: "",
  });

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
    const newDistrictRef = push(dbRef);
    set(newDistrictRef, { ...newDistrict, id: newDistrictRef.key });
    setModalVisible(false);
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
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
      <Dialog open={modalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>Add new district</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newDistrict.name}
            onChange={handleNewDistrictChange}
          />
          <TextField
            fullWidth
            label="Map"
            name="map"
            value={newDistrict.map}
            onChange={handleNewDistrictChange}
          />
          <TextField
            fullWidth
            label="Area"
            name="area"
            type="number"
            value={newDistrict.area}
            onChange={handleNewDistrictChange}
          />
          <TextField
            fullWidth
            label="Population"
            name="population"
            type="number"
            value={newDistrict.population}
            onChange={handleNewDistrictChange}
          />
          <TextField
            fullWidth
            label="Headquarters"
            name="headquarters"
            value={newDistrict.headquarters}
            onChange={handleNewDistrictChange}
          />
          <TextField
            fullWidth
            label="Region"
            name="region"
            value={newDistrict.region}
            onChange={handleNewDistrictChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVisible(false)}>Cancel</Button>
          <Button onClick={handleNewDistrictSubmit}>Add</Button>
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
                  <Button onClick={() => handleDeleteDistrict(item.id)}>
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
