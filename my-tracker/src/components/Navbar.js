import React, { useEffect, useState } from 'react';
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

const Navbar = () => {
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
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        document.cookie = "jwtoken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    
        // Redirect to the login page
        navigate('/signin');
    }
    
    return (
        <>
            <MDBNavbar expand='lg'  className='bg-[#67C6E3] fixed w-full z-10'>
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarLeftAlignExample'
                        aria-controls='navbarLeftAlignExample'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavLeft(!openNavLeft)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar open={openNavLeft} className='justify-content-center'>
                        <MDBNavbarNav className=' mb-2 mb-lg-0'>
                        {
                                userContext.isLoggedin?(
                                <MDBNavbarItem>
                                    <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                        Home
                                    </NavLink>
                                </MDBNavbarItem>):(<></>)
                            }
                            {
                                userContext.isLoggedin?(
                                <MDBNavbarItem>
                                    <NavLink to={'/notes'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                        My Notes
                                    </NavLink>
                                </MDBNavbarItem>):(<></>)
                            }

                            {
                                userContext.isLoggedin ? (
                                    <MDBNavbarItem>
                                        <NavLink to='/logout' onClick={handleLogoutClick} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                            Logout
                                        </NavLink>
                                    </MDBNavbarItem>
                                ) : (
                                    <MDBNavbarItem>
                                        <NavLink to='/signin' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                            Login
                                        </NavLink>
                                    </MDBNavbarItem>
                                )}
                                
                                {
                                userContext.isLoggedin ? (
                                    <></>
                                ) : (
                                    <MDBNavbarItem>
                                        <NavLink to='/register' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                            SignUp
                                        </NavLink>
                                    </MDBNavbarItem>
                                )}



                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}

export default Navbar;
