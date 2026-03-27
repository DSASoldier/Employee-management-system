import { Navigate } from "react-router-dom";

export default function DashBoardProtect({children}){

    const login = localStorage.getItem("token");

    if(!login){
        return <Navigate to='/'/>
    }

    return children;
}