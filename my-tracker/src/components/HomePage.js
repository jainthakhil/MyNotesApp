import React, { useState, useEffect } from 'react';
import {
    MDBContainer
  } from 'mdb-react-ui-kit';
import Navbar from './Navbar';

  
const HomePage = () => {
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
    <Navbar/>
    <MDBContainer fluid className='error d-flex align-items-center justify-content-center min-vh-100'>
        <div className="error-box d-flex align-items-center justify-content-center min-vh-100 text-center">
        <h1 style={{ fontWeight: '900', fontSize: '3rem', marginBottom: '20px', textTransform: 'uppercase', color:'#074173' }}>Welcome {userName}, to your personalised notes app.</h1>
        </div>
    </MDBContainer>

    </>
    
  );
}

export default HomePage;
