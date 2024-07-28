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

function Register() {

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
        const response = await fetch("/register",{
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
        <MDBContainer fluid className='container-sm d-flex align-items-center justify-content-center min-vh-100'>

            <MDBCard className='text-black m-5 my-auto' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <h2 className="fw-bold mb-5 text-uppercase">Sign Up</h2>
                            <form method='POST'>
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Your Name' id='form1' type='text' name='name' className='w-100' autoComplete='off'
                                        value={userData.name}
                                        onChange={handleInput}
                                        style={{fontWeight:"300"}}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form2' type='email' name='email' autoComplete='off'
                                        value={userData.email}
                                        onChange={handleInput}
                                        style={{fontWeight:"300"}}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' id='form3' type='password' name='password' autoComplete='off'
                                        value={userData.password}
                                        onChange={handleInput}
                                        style={{fontWeight:"300"}}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="key me-3" size='lg' />
                                    <MDBInput label='Confirm password' id='form4' type='password' name='confirmpassword' autoComplete='off'
                                        value={userData.confirmpassword}
                                        onChange={handleInput}
                                        style={{fontWeight:"300"}}
                                    />
                                </div>
                                <MDBBtn type='submit' className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>
                            </form>
                            <p>Already have an account? <Link to="/signin">Sign in</Link> </p>
                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
        </>
    );
}

export default Register;