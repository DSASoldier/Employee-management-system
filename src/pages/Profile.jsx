import { useState,useRef, useEffect } from "react"
import { useContext } from "react";
import { UserContext } from "../context/context";
import TextField from '@mui/material/TextField';
import axios from "axios";
import EmployeeDetail from "../component/EmployeeDetail";
import { url } from "../url/url";

export default function Profile() {

    const data = useContext(UserContext);
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const users = data.users;
    const email = data.email;
    const [phoneNumber,setphoneNumber] = useState('');
    const [address,setaddress] = useState('');
    const [emergencyNumber,setEmergencyNumber] = useState('');
    const [base64store,setBase64Store] = useState();
    const editUser = data.editUsers;
    const [editButtonClicked,setEditButtonClicked] = useState(false);
    const [employeeID,setEmployeeID] = useState('');
    const [department,setDepartment] = useState('');
    const [designation,setDesignation] = useState('');

    useEffect(()=>{
        fetchData();
    },[email])

    async function fetchData(){
        
        try{

            const apiData = await axios.get('https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json');
            const employeeDatabaseData = await axios.get(`${url}/employees.json`);
            const employeeDetails = employeeDatabaseData.data;
            const employeeData = apiData.data;

            console.log(employeeDetails);

            Object.keys(employeeData).forEach((key)=>{
                if(employeeData[key].email?.toLowerCase().trim() === email?.toLowerCase()?.trim()){

                    setphoneNumber(employeeData[key]?.phonenumber);
                    setaddress(employeeData[key]?.address);
                    setEmergencyNumber(employeeData[key]?.emergencycontact);
                }
            })

            console.log(employeeDetails);
            
            Object.keys(employeeDetails).forEach((key)=>{
                if(employeeDetails[key].email?.toLowerCase().trim() === email?.toLowerCase()?.trim()){

                    setEmployeeID(employeeDetails[key]?.EmployeeId);
                    setDepartment(employeeDetails[key]?.Designation);
                    setDesignation(employeeDetails[key]?.Designation);
                    setPreview(employeeDetails[key]?.image);
                }
            })

        }
        catch(error){
            console.log(error)
        }

    }

    async function updateEmployeeData(data,id){

        try{

            await axios.patch(`https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee/${id}.json`,data);
        }
        catch(error){
            console.log(error);
        }
    }

    async function addNewEmployee(data){

        try{
            await axios.post(`https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json`,data);            
        }
        catch(error){
            console.log(error);
        }

    }

    async function dataAddbyEmployee(data){

        try{

            const apiData = await axios.get('https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json');

            let count = 0;
            const employeeData = apiData.data;
            
            Object.keys(employeeData || {}).forEach((key)=>{
                if(employeeData[key]?.email?.toLowerCase().trim() === email?.toLowerCase()?.trim()){
                    updateEmployeeData(data,key);
                    count++;
                }
            })

            if(count===0){
                addNewEmployee(data);
            }

        }
        catch(error){
            console.log(error)
        }

    }

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    function handleEditClick(){
        setEditButtonClicked(true);
    }

    function handleSaveClick(data){
            dataAddbyEmployee(data);
            setEditButtonClicked(false);
    }
    return <div className="profileContainer">

        <div style={{ display:'flex',textAlign: "center",justifyContent:'center',alignItems:'center',height:'50vh'}}>

            <div
                // onClick={handleIconClick}
                style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden"
                }}
                
            >
                
                {preview ? (
                    <img src={preview} alt="profile" style={{ width: "100%" }} />
                ) : (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="#777"
                    viewBox="0 0 24 24"
                    >
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
                            2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 
                            2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z"/>
                    </svg>
                )}
            </div>

            {/* Hidden File Input */}
            {/* <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            /> */}

        </div>
        <div className="employee-profile-details">
            <EmployeeDetail 
                handleSaveClick={handleSaveClick} 
                edited={editButtonClicked} 
                heading={'Personal Info'} 
                details={['Email','Phone number','Address','Emergency contact']} 
                detailsInfo={[`${email}`,`${phoneNumber}`,`${address}`,`${emergencyNumber}`]} 
                handleEditClick={handleEditClick} 
            />
            <EmployeeDetail 
                heading={'Job Information'} 
                details={['Employee Id','Department','Designation','Emergency contact']} 
                detailsInfo={[`${employeeID}`,`${department}`,`${designation}`,`${emergencyNumber}`]}
            />
        </div>


    </div>
}