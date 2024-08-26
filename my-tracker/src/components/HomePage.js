import React from 'react';
import {
    MDBContainer
  } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import { useUserContext } from '../context/UserName';

  
const HomePage = () => {
  const userContext = useUserContext();
  const username = userContext.userName
  console.log(username) 
  
  return (
    <>
    <Navbar/>
    <MDBContainer fluid className='error d-flex align-items-center justify-content-center h-auto bg-[#DFF5FF]'>
        <div className="error-box d-flex align-items-center justify-content-center min-vh-100 text-center">
        <h1 style={{ fontWeight: '500', fontSize: '3rem', marginBottom: '20px', textTransform: 'uppercase', color:'#074173' }}>Welcome <span className='name-span'>{userContext.userName}</span> , to your personalised notes app.</h1>
        </div>
    </MDBContainer>

    </>
    
  );
}

export default HomePage;
