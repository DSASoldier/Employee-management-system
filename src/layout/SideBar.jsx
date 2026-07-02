import { Link } from "react-router-dom"
export default function SideBar(){

    return <div className="dashboard-side-bar">

            <div className="side-bar-component">
                <Link to={'/login-dashboard/dashboard'} className="sidebar-list-item">DashBoard</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/employee'} className="sidebar-list-item">Employee</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/settings'} className="sidebar-list-item">Setting</Link>
            </div>

            {/* <div className="side-bar-component">
                <Link to={'/login-dashboard/user-profile-detail'} className="sidebar-list-item">User profile</Link>
            </div> */}
            <div className="side-bar-component">
                <Link to={'/login-dashboard/leave-approve'} className="sidebar-list-item">Approve leave made by employees</Link>
            </div>
    </div>
}