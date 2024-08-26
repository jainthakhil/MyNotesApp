import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import '../styles.css';
import CreateNote from './CreateNote';
import { useUserContext } from '../context/UserName';


export default function NotesPage() {
  const userContext = useUserContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const name = userContext.userName;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${backendUrl}/notes/${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include' 
        });

        if (response.status === 200) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Failed to fetch notes');
          navigate('/signin');
        }
      } catch (err) {
        console.error('An error occurred while fetching notes:', err);
        navigate('/signin');
      }
    };

    fetchNotes();
  }, [navigate, notes]);

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json(); // This will fail if the response is not JSON
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== id)); // Update state to remove deleted note
        console.log("Note deleted successfully");
      } else {
        console.log("Error:", data.message || "Failed to delete note");
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  
  return (
    <>
      <Navbar />
      <MDBContainer fluid className="container-sm h-full w-full d-flex flex-wrap flex-row align-items-center justify-content-center  py-20 mx-auto bg-[#DFF5FF]">

        <MDBCard className="m-3  w-[300px] h-[250px] " >

          <MDBCardBody>
            <CreateNote />
          </MDBCardBody>

        </MDBCard>
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.slice().reverse().map(note => (
            <MDBCard key={note._id} className="m-3 bg-[#edf6ff] shadow-lg w-[300px] h-[250px]" >
              <MDBCardBody className=" w-full h-full card-body-scroll flex flex-col">

                <div className='w-full d-flex justify-content-between align-items-center mb-3 text-[#365486]'>
                  <MDBCardTitle className='mb-0 w-60  font-bold uppercase '  >{note.title}</MDBCardTitle>
                  <div>
                
                    <button onClick={() => deleteNote(note._id)} className='delete-btn' >
                    <MDBIcon fas icon="trash" size='lg'/>
                    </button>
                    
                  </div>
                </div>
                <MDBCardText className='text-[#0766AD] font-medium'>{note.desc}</MDBCardText>
                <MDBCardText className='text-end mt-[45%]'><small>{note.date}</small></MDBCardText>
              </MDBCardBody>
            </MDBCard>
          ))
        )}
      </MDBContainer>
    </>
  );
}