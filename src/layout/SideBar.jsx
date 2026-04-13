import { Link } from "react-router-dom"
export default function SideBar(){

    return <div class="dashboard-side-bar">

            <div className="side-bar-component">
                <Link to={'/login-dashboard/dashboard'} className="sidebar-list-item">DashBoard</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/employee'} className="sidebar-list-item">Employee</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/settings'} className="sidebar-list-item">Setting</Link>
            </div>
    </div>
}