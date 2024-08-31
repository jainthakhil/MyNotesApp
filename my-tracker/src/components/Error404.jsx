import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import Navbar from './Navbar';

function Error404() {
  return (
    <>
    <Navbar/>
    <MDBContainer fluid className='error d-flex align-items-center justify-content-center min-vh-100'>
        <div className="error-box d-flex align-items-center justify-content-center flex-column ">
        <h1 style={{ fontWeight: '900', fontSize: '8rem', marginBottom: '20px', textTransform: 'uppercase', color:'#e3e3e3' }}>404</h1>
        <h2 style={{textTransform:'uppercase'}}>We are sorry, page not found.</h2>
        <Link to='/signin'><MDBBtn className='mb-4' size='lg' >Login again</MDBBtn></Link>
        </div>
    </MDBContainer>

    </>
    
  );
}
export default Error404;