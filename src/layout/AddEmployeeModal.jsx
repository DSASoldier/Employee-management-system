import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RoleDropDown from '../component/RoleDropDown';

export default function AddEmployeeModal({handleClose,open,handleSubmit,name,id,role,email,status,date,status1,setStatus1}){

  const [name1,setName1] = React.useState(name || '')
  const [id1,setId1] = React.useState(id || '')
  const [role1,setRole1] = React.useState(role || '')
  const [email1,setEmail1] = React.useState(email || '')
  
  const [date1,setDate1] = React.useState(date || '')
  
  React.useEffect(()=>{

    setName1(name);
    setId1(id);
    setRole1(role);
    setEmail1(email);
    setStatus1(status);
    setDate1(date);

  },[name,id,role,email,status,date])
  
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add Employee to this website, please enter your required field here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="name"
              type="name"
              fullWidth
              variant="standard"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="id"
              name='id'
              label="enrollment number"
              type="id"
              fullWidth
              variant="standard"
              value={id1}
              onChange={(e) => setId1(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="role"
              name="role"
              label="role"
              type="role"
              fullWidth
              variant="standard"
              value={role1}
              onChange={(e) => setRole1(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="email"
              type="email"
              fullWidth
              variant="standard"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
            />
            {/* <TextField
              autoFocus
              required
              margin="dense"
              id="status"
              name="status"
              label="status"
              type="status"
              fullWidth
              variant="standard"
              value={status1}
              onChange={(e) => setStatus1(e.target.value)}
            /> */}

            <RoleDropDown status={status1} setStatus={setStatus1}/>

            <TextField
              autoFocus
              required
              margin="dense"
              id="date"
              name='date'
              type="date"
              fullWidth
              variant="standard"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
            />
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}