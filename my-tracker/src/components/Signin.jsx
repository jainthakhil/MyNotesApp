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
import { useUserContext } from '../context/UserName';
import lightUserImg from '../images/lightuser.png'
import darkUserImg from '../images/darkuser.png'
import ThemeController from './ThemeController'
import { useThemeContext } from '../context/Theme';

function Signin() {
    const themeContext = useThemeContext();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const userContext = useUserContext();
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
        if (!email || !password) {
            console.error("Both fields are required");
            alert("Please fill in both email and password.");
            setLoggedInData({ email: "", password: "" })
            return;
        }
        console.log(backendUrl);
        
        const response = await fetch(`${backendUrl}/signin`,{
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await response.json();
        const username = data.name;
        if(response.status === 404 || !data){
            alert("no user found")
            console.log("No user found")   
            setLoggedInData({ email: "", password: "" })       
        }
        else{
            userContext.setUserName(username);
            console.log(userContext.userName);
            userContext.setIsLoggedin(true);
            console.log(userContext.isLoggedin);
            navigate('/');
        }
    }
    return (
        <>
        <Navbar/>
        <ThemeController/>
        <MDBContainer fluid className=' w-full h-[calc(100vh-3.5rem-4rem)] flex flex-col align-items-center justify-content-center '>
            <MDBCard className='lg:w-[60%] w-[80%] text-black m-5 my-auto rounded-3xl bg-white/20  backdrop-blur-xl'>
                <MDBCardBody>
                    <MDBRow className='flex-row-reverse justify-center'>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <h2 className={`fw-bold mb-5 text-uppercase text-[2rem] ${themeContext.theme?'text-black':'text-[#DDDDDD]'}`}>Login</h2>
                            <form className='w-60' >

                                <div className=" w-full d-flex flex-row align-items-center justify-between mb-4">
                                    <MDBIcon fas icon="envelope me-3 " size='lg' className={`${themeContext.theme?'text-black':'text-[#DDDDDD]'}`}/>
                                    <MDBInput label='Your Email' id='form2' type='email' 
                                     name='email' 
                                     value={loggedIndata.email}
                                     onChange={handleChange}
                                     labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
                                     className={`${themeContext.theme? 'text-[#365486]' : 'text-[#DDDDDD] focus:text-white'} font-normal bg-transparent`}                                     />
                                     
                                </div>

                                <div className="d-flex flex-row align-items-center justify-between mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' className={`${themeContext.theme?'text-black':'text-[#DDDDDD]'}`} />
                                    <MDBInput label='Password' id='form3' type='password'
                                     name='password' 
                                     value={loggedIndata.password}
                                     onChange={handleChange} 
                                     labelClass={`${themeContext.theme? 'text-[#365486]' : 'text-white'} font-thin`}
                                     className={`${themeContext.theme? 'text-[#365486]' : 'text-[#DDDDDD] focus:text-white'} font-normal`}
                                     />
                                </div>

                                <p className={`${themeContext.theme? 'text-[#365486]' : 'text-[#DDDDDD]'} font-normal`}>Don't have an account? <span className='text-blue-400'><Link to="/register">Sign up</Link></span> </p>
                                <MDBBtn type='submit' onClick={handleSubmit} className='my-4 bg-[#67C6E3] hover:bg-[#67C6E3]/90' size='md'>Login</MDBBtn>

                            </form>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 flex items-center justify-center'>
                            <MDBCardImage src={themeContext.theme? lightUserImg: darkUserImg} fluid className='h-[200px]' />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
        </>
    );
}

export default Signin;