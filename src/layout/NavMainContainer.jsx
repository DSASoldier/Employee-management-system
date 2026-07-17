import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { UserContext } from "../context/context";
import SideBar from "./SideBar";


export default function NavMainContainer(){


    const [anchorEl,setAnchorEl] = useState(null);


    const navigate = useNavigate();


    const context = useContext(UserContext);


    const userImage = context.image;



    const open = Boolean(anchorEl);



    const handleClick = (event)=>{

        setAnchorEl(event.currentTarget);

    };



    const handleClose = ()=>{

        setAnchorEl(null);

    };



    const logout = ()=>{

        localStorage.removeItem("token");

        handleClose();

        navigate("/");

    };



    const goProfile = ()=>{

        handleClose();

        navigate("/profile");

    };



    return (

        <div className="nav-main-container">


            <nav className="dashboard-nav-bar">


                <div className="dashboard-logo">

                    Employee Management System

                </div>




                <div className="dashboard-actions">


                    <FaBell

                        className="notification-bell"

                        size={23}

                        onClick={()=>navigate("/login-dashboard/notifications")}

                    />





                    <Button

                        onClick={handleClick}

                        className="profile-button"

                    >


                        <div className="profile-avatar">


                            {
                            userImage ?

                            <img

                                src={userImage}

                                className="profile-image"

                                alt="profile"

                            />

                            :

                            <svg

                                xmlns="http://www.w3.org/2000/svg"

                                width="30"

                                height="30"

                                fill="#777"

                                viewBox="0 0 24 24"

                            >

                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
                            2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 
                            2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5z"/>

                            </svg>

                            }


                        </div>


                    </Button>





                    <Menu

                        anchorEl={anchorEl}

                        open={open}

                        onClose={handleClose}

                    >

                        <MenuItem onClick={goProfile}>

                            Profile

                        </MenuItem>


                        <MenuItem onClick={handleClose}>

                            My Account

                        </MenuItem>


                        <MenuItem onClick={logout}>

                            Logout

                        </MenuItem>


                    </Menu>



                </div>


            </nav>





            <main className="main-container-dashboard">


                <SideBar/>



                <div className="dashboard-content">


                    <Outlet/>


                </div>



            </main>



        </div>

    );

}