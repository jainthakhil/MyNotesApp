import React,{useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
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

function Signin() {

    const [loggedIndata, setLoggedInData] = useState({
        email:"",
        password:""
    });

    let inputValue, inputName;
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        e.preventDefault();
        inputName = e.target.name;
        inputValue = e.target.value;

        setLoggedInData({...loggedIndata, [inputName]:inputValue});

    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const{email, password} = loggedIndata;
        const response = await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await response.json();

        if(response.status === 404 || !data){
            window.alert("Login failed!");
            console.log("login error.");
        }
        else{
            window.alert("Logged in Successfull!");
            console.log("Logged in Successfull.");
            // navigate(`/notes/${data.name}`);
            navigate('/');

        }

    }

    return (
        
        <>
        <Navbar/>
        
        <MDBContainer fluid className='container-sm d-flex align-items-center justify-content-center min-vh-100'>

            <MDBCard className='text-black m-5 my-auto' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow className='flex-row-reverse'>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <h2 className="fw-bold mb-5 text-uppercase">Login</h2>
                            <form method='POST' >
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form2' type='email' 
                                     name='email' 
                                     value={loggedIndata.name}
                                     onChange={handleChange} 
                                     style={{ fontWeight: 'normal' }}
                                     />
                                     
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' id='form3' type='password'
                                     name='password' 
                                     value={loggedIndata.password}
                                     onChange={handleChange} 
                                     style={{ fontWeight: 'normal' }}
                                     />
                                </div>

                                <p>Don't have an account? <Link to="/register">Sign Up</Link> </p>

                                <MDBBtn type='submit' onClick={handleSubmit} className='mb-4' size='lg'>Login</MDBBtn>

                            </form>



                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
        </>
    );
}

export default Signin;