import { Link } from "react-router-dom"
export default function SideBar(){

    return <div class="dashboard-side-bar">

            <div className="side-bar-component">
            <Link to={'/login-dashboard/dashboard'}>DashBoard</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/employee'}>Employee</Link>
            </div>

            <div className="side-bar-component">
                <Link>Roles</Link>
            </div>

            <div className="side-bar-component">
                <Link to={'/login-dashboard/settings'}>Setting</Link>
            </div>

        {/* <div className="side-bar-component">
            <Link>Logout</Link>
        </div> */}
    </div>
}