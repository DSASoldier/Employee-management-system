import { UserContext } from "../context/context"
import { useContext } from "react"
export default function DashBoard(){

    let active = 0,inactive = 0,onLeave = 0;

    const context = useContext(UserContext);

    const users = context.users;
    
    users.forEach((user)=>{

        if(user.status.toLowerCase().trim() === 'active') active++;
        else if(user.status.toLowerCase().trim() === 'inactive') inactive++;
        else if(user.status.toLowerCase().trim() === 'leave') onLeave++;

    })

    return  <>
            <div>
                <p>Active Users {active}</p>
            </div>
            <div>
                <p>Inactive Users {inactive}</p>
            </div>
            <div>
                <p>users on leave {onLeave}</p>
            </div>
            <div>
                <p>Total Users {users.length}</p>
            </div>
    </>
    
}