import React from 'react';
import {
    MDBContainer
  } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import { useUserContext } from '../context/UserName';
import ThemeController from './ThemeController';
import { useThemeContext } from '../context/Theme';

  
const HomePage = () => {
  const ThemeContext = useThemeContext();
  const userContext = useUserContext();
  const username = userContext.userName
  console.log(username) 
  
  return (
    <>
    <Navbar/>
    <ThemeController/>
    <MDBContainer fluid className='h-[calc(100vh-3.5rem-4rem)] d-flex align-items-center justify-content-center  px-8'>
        <div className="h-full d-flex align-items-center justify-content-center text-center">
        <h1 className={`uppercase text-[#074173] text-[3rem] ${ThemeContext.theme ? 'text-black' : 'text-white'}`}>
        Welcome <span className=' font-semibold underline text-[#67C6E3]'>{userContext.userName}</span> to your personalised notes app.</h1>
        </div>
    </MDBContainer>

    </>
    
  );
}

export default HomePage;
