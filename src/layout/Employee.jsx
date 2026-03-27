
import AddEmployeeModal from "./AddEmployeeModal";
import * as React from 'react';
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/context";
import { employees } from "../constant";
import { Pagination,Box } from "@mui/material";
export default function Employee(){

    const [page, setPage] = useState(1);

    const [open, setOpen] = React.useState(false);

    const context = useContext(UserContext);

    const [employeeSearch,setEmployeeSearch] = React.useState('');

    const [employeeRole,setEmployeeRole] = React.useState('All');

    const [employeeStatus,setEmployeeStatus] = React.useState('All');

    const [status1,setStatus1] = React.useState('active');


    const itemsPerPage = 10;

    
    const addUsers = context.addUsers;
    console.log(employeeRole,employeeStatus);
    const users = context.users;

    const handleClickOpen = () => {
        setOpen(true);
    };

 
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, value) => {

        console.log(value)
        setPage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData).entries());
        
        console.log(formJson);

        formJson.status = status1;

        addUsers(formJson);

        handleClose();
    };
    
    return <div>
        <AddEmployeeModal handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} handleSubmit={handleSubmit} status1={status1} setStatus1={setStatus1}/>
        <div className="employee-filter-container">
            <input type="text" placeholder="search" onChange={(e)=>setEmployeeSearch(e.target.value)}/>
            <select onChange={(e)=>setEmployeeRole(e.target.value)}>
                <option>All</option>
                <option>manager</option>
                <option>accountant</option>
                <option>Salesman</option>
            </select>
            <select onChange={(e)=>setEmployeeStatus(e.target.value)}>
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
            </select>
        </div>

       <div className="employee-add-container">
        <p>employees</p>
        <button onClick={handleClickOpen}>Add +</button>
       </div>
        {users.slice((page-1)*itemsPerPage,(page-1)*itemsPerPage+itemsPerPage).map((employeeData)=>{

            if(
                (employeeData.email.toLowerCase().includes(employeeSearch.toLowerCase().trim()) || employeeData.name.toLowerCase().includes(employeeSearch.toLowerCase().trim()) || employeeSearch==='') && 
                (employeeData.role.toLowerCase().trim()===(employeeRole.toLowerCase().trim()) || employeeRole.toLowerCase().trim()==='all') && 
                (employeeData.status.toLowerCase().trim()===(employeeStatus.toLowerCase().trim()) || employeeStatus.toLowerCase().trim()==='all')
            )
                {

            return <div className="single-employee-data">
                <img src={employeeData.image} className='profile-image'/>
                <p>{employeeData.name}</p>
                <p>{employeeData.id}</p>
                <p>{employeeData.role}</p>
                <p>{employeeData.email}</p>
                <p>{employeeData.status}</p>
                <p>{employeeData.joiningDate || employeeData.date}</p>
            </div>
            }

        })}
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Pagination 
                count={10} 
                page={page}
                onChange={handleChange}
            />
        </Box>  

    </div>
}