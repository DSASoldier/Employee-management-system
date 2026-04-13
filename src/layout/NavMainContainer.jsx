import * as React from 'react';
import { Outlet } from "react-router-dom"
import { FaBell } from "react-icons/fa";
import cat from '../assets/cat.jpg';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/context';
import { useContext } from 'react';
import SideBar from './SideBar';

export default function NavMainContainer(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = anchorEl;
    const navigation = useNavigate();
    const data = useContext(UserContext);

    const userImage = data.user.image;

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const clearToken=()=>{
        localStorage.removeItem('token');
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const navigateToLogin = ()=>{
        clearToken();
        navigation('/');
    }
    
    const navigateToProfile = ()=>{
        navigation('/profile');
    }
    return <div className="nav-main-container">
        <nav className="dashboard-nav-bar">

            <div style={{scale:'calc(100%)',display:'flex',alignItems:'center',width:'90%'}}>
                <p style={{scale:'calc(150%)',marginLeft:'8%'}}>Employee Management System </p>
            </div>

            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'10%'}}>
                <div>     
                    <FaBell size={23}/>
                </div>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <img src={userImage} className='profile-image'/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                        }}
                    >
                        <MenuItem onClick={()=>{
                            // handleClose()
                            navigateToProfile()
                        }
                        }>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={()=>{
                            handleClose()
                            navigateToLogin()
                        }}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
        <main className='main-container-dashboard'>
            <SideBar/>
            <div style={{width:'80%',padding:'30px'}}>
                <Outlet></Outlet>
            </div>
        </main>
    </div>
}