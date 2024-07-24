import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, useTheme, InputLabel, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import Header from './Header';
import { tokens } from "../theme";
import axios from 'axios';

const GoatForm = () => {
  const [formData, setFormData] = useState({
    currentWeight: '',
    breed: '',
    gender: '',
    year_of_birth: '',
    beneficiary_id: '',
  });
  const [beneficiaries, setBeneficiaries] = useState({}); // State to store the beneficiaries

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('http://localhost:3080/api/v1/banef/all');
        var dictBnF = {};
        const beneficiaryData = response.data.msg.forEach((beneficiary) => {
          dictBnF[beneficiary._id] = beneficiary.name;
        
        });
        setBeneficiaries(dictBnF);
      } catch (error) {
        console.error(error); // Handle the error according to your needs
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { beneficiary_id, ...data } = formData; // Exclude beneficiary_id from the data object
    try {
      const response = await axios.post('http://localhost:3080/api/v1/goat/add', data);
      console.log(response.data._id); // Handle the response according to your needs
      const tag_id = response.data._id;
      const secondResponse = await axios.post('http://localhost:3080/api/v1/banef/addgoat', { tagId:tag_id, beneficiaryId:beneficiary_id });
      console.log(secondResponse.data); // Handle the response according to your needs
      setFormData({currentWeight:'',breed:'',gender:'',year_of_birth:'',beneficiary_id:''});
    } catch (error) {
      console.error(error); // Handle the error according to your needs
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center' , width: '50%'}}>
      <Header title="Assign A Goat"/>
      <TextField
        required
        id="currentWeight"
        name="currentWeight"
        label="Weight (in kg)"
        value={formData.currentWeight}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
        type='number'
      />
      <TextField
        required
        id="breed"
        name="breed"
        label="Breed"
        value={formData.breed}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          value={formData.gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <TextField
        required
        id="year_of_birth"
        name="year_of_birth"
        label="Year of birth"
        value={formData.year_of_birth}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="beneficiary_id"
        name="beneficiary_id"
        label="Beneficiary ID"
        value={formData.beneficiary_id}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
        select
      >
        {Object.entries(beneficiaries).map(([id, name]) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[300], color:colors.blueAccent[700]}}>
        Submit
      </Button>
    </Box>
  );
};

export default GoatForm;
