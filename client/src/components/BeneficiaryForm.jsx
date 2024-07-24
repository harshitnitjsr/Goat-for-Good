import React, { useState } from 'react';
import { TextField, Button, Box, useTheme, Alert } from '@mui/material';
import { tokens } from "../theme";
import Header from './Header';
import MyMap from './Map';
import axios from 'axios';

const BeneficiaryForm = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '', // Add longitude to the state
    address: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Replace '/your-endpoint' with the actual endpoint where you want to send the form data
      const response = await axios.post('http://localhost:3080/api/v1/banef/add', formData);
      console.log(response.data); // Handle the response as needed, e.g., showing a success message
      setSuccess(true);
      // Optionally, clear the form or navigate the user to another page
    } catch (error) {
      console.error('There was an error!', error);
      // Handle the error, e.g., showing an error message to the user
    }
  };

  return (<>
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%' }}>
      <Header title="Add a Beneficiary"/>
      {success && <Alert severity="success">Data inserted successfully!</Alert>}
      <TextField
        required
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="latitude"
        name="latitude"
        label="Latitude"
        value={formData.latitude}
        onChange={handleChange}
        type="number"
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="longitude"
        name="longitude" // Add longitude input field
        label="Longitude"
        value={formData.longitude}
        onChange={handleChange}
        type="number"
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="address"
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      
     <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[300], color:colors.blueAccent[700]}}>
        Submit
      </Button>
    </Box>
    <MyMap formData={formData} setFormData={setFormData}/>
    </>
  );
};

export default BeneficiaryForm;