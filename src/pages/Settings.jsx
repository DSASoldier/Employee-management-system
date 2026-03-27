import { UserContext } from "../context/context"
import { useContext } from "react"
import * as React from 'react';
import AddEmployeeModal from "../layout/AddEmployeeModal";

export default function Settings(){

    const context = useContext(UserContext);

    const editUsers = context.editUsers;

    const deleteUserData = context.deleteUserData;

    const [open, setOpen] = React.useState(false);

    const [index,setIndex] = React.useState(0);

    const [status1,setStatus1] = React.useState('active');

    const employees = context.users;

    const handleClickOpen = (index) => {

        console.log(employees[index]);
        setIndex(index)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData).entries());
       
        console.log(formJson);
        formJson.id2 = employees[index].id2;
        formJson.status = status1
        editUsers(formJson,index);

        handleClose();
    };

    return <div>
        <AddEmployeeModal handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} handleSubmit={handleSubmit} name={employees[index].name} id={employees[index].id} role={employees[index].role} email={employees[index].email} status={employees[index].status} date={employees[index].joiningDate || employees[index].date} status1={status1} setStatus1={setStatus1}/>

        {employees.map((employee,index)=>{
            return <div>
                <div className="single-employee-data">
                    <p>{employee?.name}</p>
                    <p>{employee?.id}</p>
                    <p>{employee?.role}</p>
                    <p>{employee?.email}</p>
                    <p>{employee?.status}</p>
                    <p>{employee?.joiningDate || employee.date}</p>
                </div>
                <div className="edit-delete-button-container">
                    <button onClick={()=>handleClickOpen(index)} >Edit</button>
                    <button onClick={()=>deleteUserData(employee.id2)}>Delete</button>
                </div>
            </div>
        })}

    </div>
}