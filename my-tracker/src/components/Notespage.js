import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import '../styles.css';
import CreateNote from './CreateNote';


export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const name = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/notes/${name}`, {  // Fetch notes from the server
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.status === 200) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Failed to fetch notes');
          // Optionally redirect to an error page or show a message
          navigate('/signin');
        }
      } catch (err) {
        console.error('An error occurred while fetching notes:', err);
        // Optionally redirect to an error page or show a message
        navigate('/signin');
      }
    };

    fetchNotes();
  }, [navigate]);

  //create new note 


  return (
    <>
      <Navbar />
      <MDBContainer fluid className="container-sm min-vh-100 d-flex flex-wrap flex-row align-items-center justify-content-center my-10 " style={{ paddingTop: '50px', paddingBottom:'50px' }}>

        <MDBCard className="m-3" style={{ width: '300px', height: '250px' }}>

          <MDBCardBody>
            <CreateNote />
          </MDBCardBody>

        </MDBCard>



        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.slice().reverse().map(note => (
            <MDBCard key={note._id} className="m-3" style={{ width: '300px', height: '250px' }}>
              <MDBCardBody className="card-body-scroll">

                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <MDBCardTitle className='mb-0' style={{width:"50%"}} >{note.title}</MDBCardTitle>
                  <div>
                    {/* Action links */}
                    <Link to={`/edit/${note._id}`} className='mx-2'>
                      <MDBIcon fas icon="pencil-alt" size='lg' />
                    </Link>
                    <Link to={`/delete/${note._id}`} className='mx-2'>
                      <MDBIcon fas icon="trash-alt" size='lg' />
                    </Link>
                  </div>
                </div>


                {/* <MDBCardTitle>{note.title}</MDBCardTitle> */}
                <MDBCardText>{note.desc}</MDBCardText>
                <MDBCardText><small>{note.date}</small></MDBCardText>

                {/* <div class="d-flex justify-content-end">
                  <Link to={`/edit/${note._id}`} className='mx-2 '><i class="fas fa-trash-can"></i></Link>
                  <Link to={`/edit/${note._id}`} className='mx-2 '><i class="fas fa-pencil"></i></Link>

                </div> */}



              </MDBCardBody>
            </MDBCard>
          ))
        )}
      </MDBContainer>
    </>
  );
}
