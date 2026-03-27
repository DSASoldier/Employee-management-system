import { Navigate } from "react-router-dom";

export default function LoginProtect({children}){

    const token = localStorage.getItem("token");

    if(token){
       return <Navigate to="/login-dashboard"/>        
    }

    return children
}