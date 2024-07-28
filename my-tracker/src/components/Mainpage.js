// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Mainpage = () => {

//     const navigate = useNavigate();

//     const callMainPage = async ()=>{
//         try{
//             const response = await fetch('/mainpage',{
//                 method:'GET',
//                 headers:{
//                     Accept:"application/json",
//                     "Content-Type":"application/json"
//                 },
//                 credentials:"include"
//             });

//             const data = await response.json();
//             console.log(data);

//             if(response.status !== 200){
//                 const error = new Error(response.error);
//                 throw error;
//             }
             
//         } catch(err){
//             console.log(err);
//             navigate('/signin');
 
//         }
//     }

//     useEffect(()=>{
//         callMainPage();
//     },[]);




//   return (
//     <div>
//         <h1>Main page</h1>
//         <Link to="/signin">Back</Link>
//     </div>
//   )
// }

// export default Mainpage