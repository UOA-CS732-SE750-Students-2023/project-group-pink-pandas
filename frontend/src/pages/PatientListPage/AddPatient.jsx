import { useState, React, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, FormGroup, FormLabel,FormControlLabel,Radio, RadioGroup, Switch, Button, Select, MenuItem, InputLabel, Checkbox} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import axios from 'axios';
import { AppContext } from '../../utils/AppContextProvider';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export default function AddPatient(){

  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState('');
  const [clinicians, setClinicians] = useState([]);
  const { addPatientProvider } = useContext(AppContext);

  useEffect(() => {
    async function getClinicians() {
      // should pass in userID instead
      const { data } = await axios.get(`${API_BASE_URL}/api/patient/supervisors/6452d16bf463933550272397`);
      let renderClinicians = [];
      for(const c of data) {
        const name = `${c.fname} ${c.lname}`
        renderClinicians.push( <FormControlLabel key={c.id} value={c.id} control={<Radio />} label={name} name="responsibleClinicians"/>)
      }
      setClinicians(renderClinicians);
    }
   getClinicians();
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      fname: formData.get('fname'),
      lname: formData.get('lname'),
      location: location,
      description: formData.get('description'),
      responsibleClinicians: formData.get('responsibleClinicians'), 
      quickAdd: formData.get('blood-test') && formData.get('radiology') ? 'blood-test, radiology' : formData.get('blood-test') ? 'blood-test' : formData.get('radiology') ? 'radiology' : null ,
      notification: formData.get('notification'),
      birth_date: dob,
      gender: gender,
    };
    // await axios.post(`${API_BASE_URL}/api/patient/add`, data)
    //         .then(console.log(data));
    addPatientProvider(data)
  }
  
  function onGenderChange(e) {
    setGender(e.target.value);
  }
  function onLocationChange(e) {
    setLocation(e.target.value);
  }

    return(
        <Box sx={{'& .MuiTextField-root': { my: 1}}}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextField multiline fullWidth label="First name" name="fname" sx={{mr: 1}}/>
            <TextField multiline fullWidth label="Last name" name="lname" sx={{ml: 1}}/>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center', justifyContent: 'space-between'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateField sx={{ width: '100%' }} format="DD-MM-YYYY" label="Date of Birth" value={dob} onChange={(e) => setDob(e)}/>
              </LocalizationProvider>
              <FormControl fullWidth sx={{ml: 2, textAlign:'left'}} >
                <InputLabel id="select-gender" >Gender</InputLabel>
                  <Select labelId="select-gender" value={gender} label="Gender" onChange={onGenderChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              <FormControl fullWidth sx={{ml: 2, textAlign:'left'}} >
                <InputLabel id="select-location" >Location</InputLabel>
                  <Select labelId="select-location" value={location} label="Location" onChange={onLocationChange}>
                    <MenuItem value="Auckland">Auckland</MenuItem>
                    <MenuItem value="Wellington">Wellington</MenuItem>
                    <MenuItem value="Queenstown">Queenstown</MenuItem>
                    <MenuItem value="Christchurch">Christchurch</MenuItem>
                  </Select>
              </FormControl>
            </Box>
          <TextField multiline fullWidth label="Description" rows={4} name="description"/>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <FormLabel style={{textAlign: "left"}} component="label">Responsible Clinician</FormLabel>
            <RadioGroup >
              {clinicians}
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <FormLabel style={{textAlign: "left"}} component="label">Quick add</FormLabel>
            <FormControlLabel value="blood test" control={<Checkbox />} label="Blood Test" name="blood-test"/>
            <FormControlLabel value="radiology" control={<Checkbox />} label="Radiology" name="radiology"/>
          </FormControl>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="Notification" name="notification" />
         </FormGroup>
         <Button style={{display: 'flex'}} variant="contained" type="submit">Add</Button>
         </form>
      </Box>
    )
    
}