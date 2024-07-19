import React, { useEffect, useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { Link, NavLink } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../styles.css';

const Navbar = () => {
    const [openNavColorThird, setOpenNavColorThird] = useState(false);

    const [userName, setUserName] = useState('');

    const userHomePage = async()=>{
      try{
          const response = await fetch('/getdata', {
              method:"GET",
              headers:{
                  "Content-Type":"application/json"
              },
          });
          const data = await response.json();
          console.log(data);
          setUserName(data.name);
      } catch(err){
          console.log(err);
      }
    }
    useEffect(()=>{
      userHomePage();
    },[]);

    return (
        <>
             <MDBNavbar expand='lg' dark bgColor='primary' light >
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>UrNote</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavColorThird(!openNavColorThird)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={openNavColorThird} navbar>
                        <MDBNavbarNav className='ms-auto mb-2 mb-lg-0 '>
                            <MDBNavbarItem className=''>
                            {/* <MDBNavbarLink tag={Link} to='/' end>Home</MDBNavbarLink> */}
                            <NavLink to='/' end className= {({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                    Home
                                </NavLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                            {/* <MDBNavbarLink tag={Link} to='/notes/:name'  >My Notes</MDBNavbarLink> */}
                            <NavLink to={`/notes/${userName}`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                    My Notes
                                </NavLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                {/* <MDBNavbarLink tag={Link} to='/signin'>Login</MDBNavbarLink> */}
                                <NavLink to='/signin' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                    Login
                                </NavLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                            {/* <MDBNavbarLink tag={Link} to='/logout' >Logout</MDBNavbarLink> */}
                            <NavLink to='/logout' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} >
                                        Logout
                                    </NavLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}

export default Navbar;
