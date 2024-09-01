import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import '../styles.css';
import CreateNote from './CreateNote';
import ThemeController from './ThemeController';
import { useThemeContext } from '../context/Theme';

export default function NotesPage() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const themeContext = useThemeContext();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${backendUrl}/notes`, {
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
  
      const data = await response.json(); 
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== id));
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
      <ThemeController/>
      <MDBContainer fluid className=" h-full w-full d-flex flex-wrap flex-row align-items-center justify-content-center py-20 mx-auto ">

        <MDBCard className="m-3  w-[300px] h-auto bg-white/20 backdrop-blur-lg rounded-3xl" >

          <MDBCardBody>
            <CreateNote />
          </MDBCardBody>

        </MDBCard>
        {notes.length === 0 ? (
          <p className='text-[#365486]'>No notes available.</p>
        ) : (
          notes.slice().reverse().map(note => (

            <MDBCard key={note._id} className="m-3 bg-[#edf6ff] shadow-lg w-[300px] h-[250px] bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden" >
              <MDBCardBody className=" w-full h-full card-body-scroll flex flex-col">

                <div className={`w-full d-flex justify-content-between align-items-center mb-3 text-[#365486] ${themeContext.theme? 'text-[#365486]' : 'text-white'}`}>
                  <MDBCardTitle className = 'mb-0 w-60  font-bold uppercase tracking-wider'  >{note.title}</MDBCardTitle>
                  <div>
                
                    <button onClick={() => deleteNote(note._id)} className='delete-btn' >
                    <MDBIcon fas icon="trash" size='lg'/>
                    </button>
                    
                  </div>
                </div>
                <MDBCardText className={`${themeContext.theme? 'text-[#0766AD]' : 'text-white'}  font-light`}>{note.desc}</MDBCardText>
                <MDBCardText className= {`${themeContext.theme? 'text-[#0766AD]' : 'text-[#67C6E3]'} `} ><small>{note.date}</small></MDBCardText>
              </MDBCardBody>
            </MDBCard>
          ))
        )}
      </MDBContainer>
    </>
  );
}



//----------------------------------------------------------