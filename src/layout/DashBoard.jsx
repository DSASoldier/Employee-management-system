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

                <h2 style={{color:'white'}}>Total Users {users.length}</h2>

                <div>
                    <p style={{color:'white'}}>Active Users {active}</p>

                    <p style={{color:'white'}}>On leave {onLeave}</p>

                    <p style={{color:'white'}}>Notice Period {onLeave}</p>
                
                    <p style={{color:'white'}}>Resigned {onLeave}</p>

                    <p style={{color:'white'}}>terminated {onLeave}</p>
                    
                </div>
                
            </div>
}