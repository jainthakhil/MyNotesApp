import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useThemeContext } from '../context/Theme'


const CreateNote = () => {
  const themeContext = useThemeContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
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
      const response = await fetch(`${backendUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
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

          navigate('/notes');
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
        <form >
        <MDBInput 
          id='form4Example1' 
          wrapperClass='mb-3' 
          name="date" 
          label='Date' 
          type='date' 
          value={notesData.date} 
          onChange={handleChange} 
          placeholder=''
          labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
          className={`${themeContext.theme? 'text-[#365486]' : 'text-white'} font-normal`}
        />
        <MDBInput 
          type='text' 
          id='form4Example2' 
          wrapperClass='mb-3' 
          name="title" 
          label='Title' 
          value={notesData.title} 
          onChange={handleChange} 
          labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
          className={`${themeContext.theme? 'text-[#365486]' : 'text-white'} font-normal`}          
        />
        <MDBInput 
          wrapperClass='mb-3' 
          type='text' 
          id='form4Example3' 
          rows={6} 
          name="desc" 
          label='Note' 
          value={notesData.desc} 
          onChange={handleChange} 
          labelClass={`${themeContext.theme ? 'text-[#365486]' : 'text-white'} font-thin`}
          className={`${themeContext.theme? 'text-[#365486]' : 'text-white'} font-normal`}        />
        <MDBBtn type='submit' className='mb-4 bg-[#67C6E3]  hover:bg-[#67C6E3]/90' block onClick={handleSubmit}>
          Add
        </MDBBtn>
      </form>
    </>
  )
}

export default CreateNote;