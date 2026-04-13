
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
    const users = context.users;

    const handleClickOpen = () => {
        setOpen(true);
    };

 
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, value) => {

        setPage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData).entries());
        

        formJson.status = status1;

        addUsers(formJson);

        handleClose();
    };
    
    return <div>
        <AddEmployeeModal handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} handleSubmit={handleSubmit} status1={status1} setStatus1={setStatus1}/>
        <div className="employee-filter-container">
            <input type="text" placeholder="search" onChange={(e)=>setEmployeeSearch(e.target.value)}className="dashboard-search"/>

            <div className="employee-selectors">
                <select onChange={(e)=>setEmployeeRole(e.target.value)}>
                    <option className="selectors">All</option>
                    <option className="selectors">manager</option>
                    <option className="selectors">accountant</option>
                    <option className="selectors">Salesman</option>
                </select>
                <select onChange={(e)=>setEmployeeStatus(e.target.value)}>
                    <option className="selectors">All</option>
                    <option className="selectors">Active</option>
                    <option className="selectors">Inactive</option>
                    <option className="selectors">On Leave</option>
                </select>
            </div>
        </div>

       <div className="employee-add-container">
            <p className="add-employee-text">Add employees</p>
            <button onClick={handleClickOpen} className="employee-add-button">Add +</button>
       </div>

        <div className="employees-detail-container">
            {users.slice((page-1)*itemsPerPage,(page-1)*itemsPerPage+itemsPerPage).map((employeeData)=>{

                if(
                    (employeeData.email.toLowerCase().includes(employeeSearch.toLowerCase().trim()) || employeeData.name.toLowerCase().includes(employeeSearch.toLowerCase().trim()) || employeeSearch==='') && 
                    (employeeData.role.toLowerCase().trim()===(employeeRole.toLowerCase().trim()) || employeeRole.toLowerCase().trim()==='all') && 
                    (employeeData.status.toLowerCase().trim()===(employeeStatus.toLowerCase().trim()) || employeeStatus.toLowerCase().trim()==='all')
                )
                    {

                return <div className="single-employee-data">
                    <img src={employeeData.image} className='profile-image'/>
                    <p style={{color:'white'}}>{employeeData.name}</p>
                    <p style={{color:'white'}}>{employeeData.id}</p>
                    <p style={{color:'white'}}>{employeeData.role}</p>
                    <p style={{color:'white'}}>{employeeData.email}</p>
                    <p style={{color:'white'}}>{employeeData.status}</p>
                    <p style={{color:'white'}}>{employeeData.joiningDate || employeeData.date}</p>
                </div>
                }

            })}
        </div>
        <Box sx={{ display: "flex",width:'70%' ,justifyContent: "center",position:'fixed',bottom:20 }}>
            <Pagination 
                count={10} 
                page={page}
                onChange={handleChange}
            />
        </Box>  

    </div>
}