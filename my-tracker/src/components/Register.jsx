import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import ThemeController from './ThemeController';
import { useThemeContext } from '../context/Theme';
import lightRegisterImg from '../images/lightregister.png'
import darkRegisterImg from '../images/darkregister.png'

function Register() {
    const themeContext  = useThemeContext();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""

    });
    let inputName, inputValue;
    const navigate = useNavigate();

    const handleInput = (e) => {
        inputName = e.target.name;
        inputValue = e.target.value;

        setUserData({ ...userData, [inputName]: inputValue });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, confirmpassword} = userData;
        const response = await fetch(`${backendUrl}/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, email, password, confirmpassword
            })
        });
        const data = await response.json();
        if(data.status === 422 || !data){
            console.log("registration error.");
        } else{
            console.log("registration Successfull.");
            navigate("/signin");

        }

    }

    return (
        <>
        <Navbar/>
        <ThemeController/>
        <MDBContainer fluid className='w-full h-[calc(100vh-3.5rem-4rem)]  flex align-items-center justify-content-center pt-40 '>

            <MDBCard className='lg:w-[60%] w-[80%] text-black rounded-3xl bg-white/20 backdrop-blur-xl' >
                <MDBCardBody>
                    <MDBRow className='justify-center'> 
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <h2 className={`fw-bold mb-5 text-uppercase text-[2rem] ${themeContext.theme?'text-black':'text-[#DDDDDD]'}`}>Sign Up</h2>
                            <form className='w-60'>
                                <div className="d-flex flex-row align-items-center justify-between mb-2  ">
                                    <MDBIcon fas icon="user me-3" size='lg' className={`${themeContext.theme?'text-black':'text-[#DDDDDD]'}`}/>
                                    <MDBInput label='Your Name' id='form1' type='text' name='name'  autoComplete='off'
                                        value={userData.name}
                                        onChange={handleInput}
                                        labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
                                        className={`${themeContext.theme? 'text-[#365486] ' : 'text-[#DDDDDD] focus:text-white'} font-normal`}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center justify-between mb-2">
                                    <MDBIcon fas icon="envelope me-3" size='lg' className={`${themeContext.theme?'text-black':'text-[#DDDDDD]'}`} />
                                    <MDBInput label='Your Email' id='form2' type='email' name='email' autoComplete='off'
                                        value={userData.email}
                                        onChange={handleInput}
                                        labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
                                        className={`${themeContext.theme? 'text-[#365486] ' : 'text-white focus:text-white'} font-normal`}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center justify-between mb-2">
                                    <MDBIcon fas icon="lock me-3" size='lg' className={`${themeContext.theme?'text-black':'text-[#DDDDDD]'}`} />
                                    <MDBInput label='Password' id='form3' type='password' name='password' autoComplete='off'
                                        value={userData.password}
                                        onChange={handleInput}
                                        labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
                                        className={`${themeContext.theme? 'text-[#365486]' : 'text-white focus:text-white'} font-normal `}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center justify-between mb-2">
                                    <MDBIcon fas icon="key me-3" size='lg' className={`${themeContext.theme?'text-black':'text-[#DDDDDD]'}`}/>
                                    <MDBInput label='Confirm password' id='form4' type='password' name='confirmpassword' autoComplete='off'
                                        value={userData.confirmpassword}
                                        onChange={handleInput}
                                        labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
                                        className={`${themeContext.theme? 'text-[#365486]' : 'text-white focus:text-white'} font-normal`}
                                    />
                                </div>
                                <MDBBtn type='submit' className='my-4 bg-[#67C6E3] hover:bg-[#67C6E3]/90' size='md' onClick={handleSubmit}>Register</MDBBtn>
                            </form>
                            <p className={`${themeContext.theme? 'text-[#365486]' : 'text-[#DDDDDD]'} font-normal 'mt-2'`}>Already have an account? <span className='text-blue-400'><Link to="/signin">Sign in</Link></span>  </p>
                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 flex align-items-center justify-center'>
                            <MDBCardImage src={themeContext.theme? lightRegisterImg: darkRegisterImg}  fluid className='h-[200px]' />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
        </>
    );
}

export default Register;