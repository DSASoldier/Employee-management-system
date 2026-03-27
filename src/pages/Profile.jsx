import { useState,useRef } from "react"
import { useContext } from "react";
import { UserContext } from "../context/context";
import TextField from '@mui/material/TextField';
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {

    const data = useContext(UserContext);
    const img = data.user.image
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(img);

    
    const user = data.user;
    
    const users = data.users;

    const editUser = data.editUsers;

    const handleIconClick = () => {
        fileInputRef.current.click(); // open file selector
        
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

         reader.onloadend = () => {
            const base64 = reader.result;

            users.forEach((employee)=>{
                if(employee.email.toLowerCase().trim()===user.email.toLowerCase().trim()){

                    employee.image = base64;
                    editUser(employee,0);
                }
            })
        };

  reader.readAsDataURL(file);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }

    };

    console.log(user);

    return <div className="profileContainer">

        <div style={{ display:'flex',textAlign: "center",width:'50%',justifyContent:'center',alignItems:'center',height:'50vh'}}>

            {/* Clickable Avatar */}
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
                    defaultValue={user.firstName}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue={user.lastName}
                />
              
                <TextField
                    required
                    id="outlined-required"
                    label="Gender"
                    defaultValue={user.gender}
                />
                

                <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue={user.age}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue={user.age}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue={user.age}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue={user.age}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue={user.age}
                />
                
            </div>
        </div>
    </div>
}