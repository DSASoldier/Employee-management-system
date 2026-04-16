import { useState,useRef, useEffect } from "react"
import { useContext } from "react";
import { UserContext } from "../context/context";
import TextField from '@mui/material/TextField';
import axios from "axios";

export default function Profile() {

    const data = useContext(UserContext);
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const users = data.users;
    const email = data.email
    const [firstName,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [gender,setGender] = useState('');
    const [age,setAge] = useState('');
    const [base64store,setBase64Store] = useState();
    const editUser = data.editUsers;

    useEffect(()=>{
        fetchData();
    },[email])

    async function fetchData(){
        
        try{

            const apiData = await axios.get('https://employee-management-syst-2f45a-default-rtdb.firebaseio.com/dataAddbyEmployee.json');

            const employeeData = apiData.data;

            console.log(employeeData)
            Object.keys(employeeData).forEach((key)=>{
                console.log(email?.toLowerCase()?.trim());
                if(employeeData[key].email?.toLowerCase().trim() === email?.toLowerCase()?.trim()){
                    
                    setFirstname(employeeData[key]?.firstName);
                    setLastname(employeeData[key]?.lastName);
                    setAge(employeeData[key]?.age);
                    setGender(employeeData[key]?.gender);
                    setPreview(employeeData[key]?.image);
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

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;

           users.forEach((data)=>{

            const employee = data;
            
            if(employee?.email?.toLowerCase()?.trim()===email?.toLowerCase()?.trim()){

                employee.image = base64;
                editUser(employee,0);
                setBase64Store(base64)
                
            }
        })
        };

        reader.readAsDataURL(file);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    function addEmployeeDataHandler(){

        if(firstName && lastname && age && gender && preview){

            console.log(firstName,lastname,age,gender,preview);

            dataAddbyEmployee({
                firstName:firstName,
                lastName:lastname,
                age:age,
                gender:gender,
                email:email,
                image:base64store
            })
        }
    }

    return <div className="profileContainer">

        <div style={{ display:'flex',textAlign: "center",width:'50%',justifyContent:'center',alignItems:'center',height:'50vh'}}>

            <div
                onClick={handleIconClick}
                style={{
                    width: "120px",
                    height: "120px",
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
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

        </div>
        <div style={{width:'50%',display:'grid',justifyContent:'center',alignItems:'center',height:'100vh'}}>
            <div style={{display:'grid',gridTemplateColumns: 'repeat(2,1fr)',gap:'20px'}}>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    value={firstName}
                    onChange={(e)=>setFirstname(e.target.value)}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                />
              
                <TextField
                    required
                    id="outlined-required"
                    label="Gender"
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                />
                
                <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    value={age}
                    onChange={(e)=>setAge(e.target.value)}
                />

            </div>
            <button onClick={addEmployeeDataHandler} className="add-data-by-employee">Add</button>
        </div>
    </div>
}