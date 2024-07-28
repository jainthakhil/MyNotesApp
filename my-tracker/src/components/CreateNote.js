import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const CreateNote = () => {

  const navigate = useNavigate();
  const [notesData, setNotesData] = useState({
    date: "",
    title: "",
    desc: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotesData({ ...notesData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/notes/:name', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notesData)
      });
      const data = await response.json();

      if (response.status !== 200 || !data) {
        console.log("Adding error.");
      } else {
        console.log("Added successfully.");

        setNotesData({
            date: "",
            title: "",
            desc: ""
          });
  


        const notesResponse = await fetch(`/notes/${data.name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const notesData = await notesResponse.json();

        if (notesResponse.status === 200) {
          navigate(`/notes/${data.name}`, { state: { notes: notesData } });
        } else {
          console.error("Failed to fetch notes");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
        <form method='POST'>
        <MDBInput 
          id='form4Example1' 
          wrapperClass='mb-3' 
          name="date" 
          label='Date' 
          type='date' 
          value={notesData.date} 
          onChange={handleChange} 
          placeholder=''
          style={{ fontWeight: 'normal' }}
        />
        <MDBInput 
          type='text' 
          id='form4Example2' 
          wrapperClass='mb-3' 
          name="title" 
          label='Title' 
          value={notesData.title} 
          onChange={handleChange} 
          style={{ fontWeight: 'normal' }}
        />
        <MDBInput 
          wrapperClass='mb-3' 
          textarea 
          id='form4Example3' 
          rows={6} 
          name="desc" 
          label='Note' 
          value={notesData.desc} 
          onChange={handleChange} 
          style={{ fontWeight: 'normal' }}
        />
        <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
          Add
        </MDBBtn>
      </form>
    </>
  )
}

export default CreateNote;