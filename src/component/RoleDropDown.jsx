import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function RoleDropDown({status,setStatus}) {
  

  const handleChange = (event) => {

    console.log(event.target.value);
    setStatus(event.target.value);

  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label="status"
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'InActive'}>Inactive</MenuItem>
          <MenuItem value={'Leave'}>Leave</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}