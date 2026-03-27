import { useEffect, useState } from "react"
import { employees } from "../constant"
import { useContext } from "react";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const contextData = useContext(UserContext);
    const users = contextData.users;
    const navigation = useNavigate();

    console.log(users);

    function handleSubmit(e){

        e.preventDefault();

        console.log("click",users);
        users.forEach((user)=>{

            if(email.toLowerCase().trim()===user.email.toLowerCase().trim()){
                
                localStorage.setItem("token",email.toLowerCase().trim());
                console.log("user has login");
                navigation('/login-dashboard');

            }
        })

        console.log("end");
    }

    return <form onSubmit={handleSubmit}>
            
            <p>Enter Your Email</p>
            <input type="text" onChange={(e)=>{
                setEmail(e.target.value);
            }}
            value={email}
            />

            <p>Enter Your password</p>
            <input type="password" onChange={(e)=>{
                setPassword(e.target.value);
            }}
            value={password}
            />

            <button>Submit</button>
        </form>
}