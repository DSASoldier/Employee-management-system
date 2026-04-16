import { UserContext } from "../context/context"
import { useContext, useEffect } from "react"
export default function DashBoard(){

    let active = 0,inactive = 0,onLeave = 0;

    const context = useContext(UserContext);

    const users = context.users;
    
    useEffect(()=>{
        context.fetchData();
    },[]);
    
    users.forEach((user)=>{

        if(user.status.toLowerCase().trim() === 'active') active++;
        else if(user.status.toLowerCase().trim() === 'inactive') inactive++;
        else if(user.status.toLowerCase().trim() === 'leave') onLeave++;

    })

    return <div className="dashboard-root">
                <div>
                    <p style={{color:'white'}}>Active Users {active}</p>
                </div>
                <div>
                    <p style={{color:'white'}}>Inactive Users {inactive}</p>
                </div>
                <div>
                    <p style={{color:'white'}}>users on leave {onLeave}</p>
                </div>
                <div>
                    <p style={{color:'white'}}>Total Users {users.length}</p>
                </div>
            </div>
}