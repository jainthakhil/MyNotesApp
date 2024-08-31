import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBCollapse

} from 'mdb-react-ui-kit';

import { NavLink, useNavigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../styles.css';
import { useUserContext } from '../context/UserName';
import { useThemeContext } from '../context/Theme';

const Navbar = () => {
    const themeContext = useThemeContext();
    const textColorClass = themeContext.theme ? 'text-black' : 'text-white';
    const iconColor = themeContext.theme ? 'black' : 'white';


    const navigate = useNavigate();
    const userContext = useUserContext();
    const [openNavLeft, setOpenNavLeft] = useState(false);

    const handleLogoutClick = async ()=>{
        userContext.setIsLoggedin(false);
        await fetch('/logout', {
            method: 'GET',
            credentials: 'include'
        });
        
        // Clear any client-side storage
        localStorage.removeItem('userName');
        document.cookie = "jwtoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    
        // Redirect to the login page
        navigate('/signin');
    }
    
    return (
        <>

            <MDBNavbar expand='lg'  className=' h-14 w-full fixed z-10 shadow-none backdrop-blur-sm '>
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarLeftAlignExample'
                        aria-controls='navbarLeftAlignExample'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavLeft(!openNavLeft)}
                    >
                          <MDBIcon icon='bars' fas style={{ color: iconColor }} />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar open={openNavLeft} className=' w-full  justify-content-center'>
                        <MDBNavbarNav className=' mb-2 mb-lg-0 '>
                            {
                                userContext.isLoggedin?(
                                <MDBNavbarItem >
                                    <NavLink to='/' className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active ' : ''} ${textColorClass}`}>
                                        Home
                                    </NavLink>
                                </MDBNavbarItem>):(<></>)
                            }
                            {
                                userContext.isLoggedin?(
                                <MDBNavbarItem>
                                    <NavLink to={'/notes'} className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''} ${textColorClass}`}>
                                        My Notes
                                    </NavLink>
                                </MDBNavbarItem>):(<></>)
                            }

                            {
                                userContext.isLoggedin ? (
                                    <MDBNavbarItem>
                                        <NavLink to='/logout' onClick={handleLogoutClick} className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''} ${textColorClass}`}>
                                            Logout
                                        </NavLink>
                                    </MDBNavbarItem>
                                ) : (
                                    <MDBNavbarItem>
                                        <NavLink to='/signin' className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''} ${textColorClass}`}>
                                            Login
                                        </NavLink>
                                    </MDBNavbarItem>
                                )}
                                
                                {
                                userContext.isLoggedin ? (
                                    <></>
                                ) : (
                                    <MDBNavbarItem>
                                        <NavLink to='/register' className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''} ${textColorClass}`}>
                                            SignUp
                                        </NavLink>
                                    </MDBNavbarItem>
                                )
                                }
                                
                    

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}

export default Navbar;
