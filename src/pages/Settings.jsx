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

    const employees = context.users || [];

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
        <AddEmployeeModal handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} handleSubmit={handleSubmit} name={employees[index]?.name} id={employees[index]?.id} role={employees[index]?.role} email={employees[index]?.email} status={employees[index]?.status} date={employees[index]?.joiningDate || employees[index]?.date} status1={status1} setStatus1={setStatus1}/>

        <div className="setting-root">

            {employees.map((employee,index)=>{
                return <div>
                    <div className="single-employee-data">
                        <p style={{color:'white',width:'15%',textAlign:'center'}}>{employee?.name || ''}</p>
                        <p style={{color:'white',width:'15%',textAlign:'center'}}>{employee?.id || ''}</p>
                        <p style={{color:'white',width:'15%',textAlign:'center'}}>{employee?.role || ''}</p>
                        <p style={{color:'white',width:'15%',textAlign:'center'}}>{employee?.email || ''}</p>
                        <p style={{color:'white',width:'15%',textAlign:'center'}}>{employee?.status || ''}</p>
                        <p style={{color:'white',width:'15%',textAlign:'center'}}>{employee?.joiningDate || employee?.date}</p>
                    </div>
                    <div className="edit-delete-button-container">
                        <button onClick={()=>handleClickOpen(index)} >Edit</button>
                        <button onClick={()=>deleteUserData(employee.id2)}>Delete</button>
                    </div>
                </div>
            })}

        </div>
            

    </div>
}