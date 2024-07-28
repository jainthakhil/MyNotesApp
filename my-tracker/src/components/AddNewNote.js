// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
// import Navbar from './Navbar';


// export default function AddNewNote() {
//   const navigate = useNavigate();
//   const [notesData, setNotesData] = useState({
//     date: "",
//     title: "",
//     desc: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNotesData({ ...notesData, [name]: value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/addnew', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(notesData)
//       });
//       const data = await response.json();

//       if (response.status !== 200 || !data) {
//         window.alert("Adding failed!");
//         console.log("Adding error.");
//       } else {
//         window.alert("Added successfully!");
//         console.log("Added successfully.");

//         const notesResponse = await fetch(`/notes/${data.name}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });

//         const notesData = await notesResponse.json();

//         if (notesResponse.status === 200) {
//           navigate(`/notes/${data.name}`, { state: { notes: notesData } });
//         } else {
//           console.error("Failed to fetch notes");
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <>
//     <Navbar/>
//     <MDBContainer fluid className="container-sm min-vh-100 d-flex align-items-center justify-content-center">
//       <form method='POST'>
//         <MDBInput 
//           id='form4Example1' 
//           wrapperClass='mb-4' 
//           name="date" 
//           label='Date' 
//           type='date' 
//           value={notesData.date} 
//           onChange={handleChange} 
//         />
//         <MDBInput 
//           type='text' 
//           id='form4Example2' 
//           wrapperClass='mb-4' 
//           name="title" 
//           label='Title' 
//           value={notesData.title} 
//           onChange={handleChange} 
//         />
//         <MDBInput 
//           wrapperClass='mb-4' 
//           textarea 
//           id='form4Example3' 
//           rows={6} 
//           name="desc" 
//           label='Note' 
//           value={notesData.desc} 
//           onChange={handleChange} 
//         />
//         <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
//           Submit
//         </MDBBtn>
//       </form>
//     </MDBContainer>
//     </>
//   );
// }
