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

export default function NavMainContainer(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = anchorEl;
    const navigation = useNavigate();
    const data = useContext(UserContext);

    const userImage = data.user.image;

    console.log(data.user);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const navigateToProfile = ()=>{
        navigation('/profile');
    }

    return <div className="nav-main-container">
        <nav className="dashboard-nav-bar">

            <div>
                <span>Employee Management System </span>
                <input type="text" placeholder="search"/>
            </div>

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
                        handleClose()
                        navigateToProfile()
                    }
                    }>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </nav>
        <main>
            <Outlet></Outlet>
        </main>
    </div>
}