import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../context/context";

export default function SideBar(){

    const context = useContext(UserContext);

    const designation = context.designation;

    return <div className="dashboard-side-bar">

            <div className="side-bar-component">
                <Link to={'/login-dashboard/dashboard'} className="sidebar-list-item">DashBoard</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/employee'} className="sidebar-list-item">Employee</Link>
            </div>

            {designation.toLowerCase().trim() === 'manager' && <div className="side-bar-component">
                    <Link to={'/login-dashboard/settings'} className="sidebar-list-item">Setting</Link>
                </div>
            }

            {/* <div className="side-bar-component">
                <Link to={'/login-dashboard/user-profile-detail'} className="sidebar-list-item">User profile</Link>
            </div> */}
            {designation.toLowerCase().trim() === 'hr' && <div className="side-bar-component">
                <Link to={'/login-dashboard/leave-approve'} className="sidebar-list-item">Approve leave </Link>
            </div>}

            <div className="side-bar-component">
                <Link to={'/login-dashboard/apply-leave'} className="sidebar-list-item">Apply for leave</Link>
            </div>
    </div>
}