import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/context";

import {
    FaHome,
    FaUsers,
    FaCog,
    FaCalendarAlt,
    FaCheckCircle
} from "react-icons/fa";


export default function SideBar(){


    const context = useContext(UserContext);


    const designation = 
        context.designation?.toLowerCase().trim();



    const menuItems = [

        {
            name:"Dashboard",
            path:"/login-dashboard/dashboard",
            icon:<FaHome/>
        },


        {
            name:"Employee",
            path:"/login-dashboard/employee",
            icon:<FaUsers/>
        },


        {
            name:"Apply Leave",
            path:"/login-dashboard/apply-leave",
            icon:<FaCalendarAlt/>
        }

    ];



    return (

        <aside className="dashboard-side-bar">


            {
                menuItems.map((item,index)=>(

                    <NavLink

                        key={index}

                        to={item.path}

                        className={({isActive})=>

                            isActive 
                            ? 
                            "sidebar-link active-sidebar"
                            :
                            "sidebar-link"

                        }

                    >

                        <span className="sidebar-icon">

                            {item.icon}

                        </span>


                        {item.name}


                    </NavLink>

                ))
            }





            {
                designation === "manager" &&

                <NavLink

                    to="/login-dashboard/settings"

                    className={({isActive})=>

                        isActive
                        ?
                        "sidebar-link active-sidebar"
                        :
                        "sidebar-link"

                    }

                >

                    <span className="sidebar-icon">

                        <FaCog/>

                    </span>


                    Settings


                </NavLink>

            }





            {
                designation === "hr" &&

                <NavLink

                    to="/login-dashboard/leave-approve"

                    className={({isActive})=>

                        isActive
                        ?
                        "sidebar-link active-sidebar"
                        :
                        "sidebar-link"

                    }

                >

                    <span className="sidebar-icon">

                        <FaCheckCircle/>

                    </span>


                    Approve Leave


                </NavLink>

            }



        </aside>

    );

}