import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Signin from './Signin';
import Error404 from './Error404';
import NotesPage from './Notespage';
import Logout from './Logout';
import HomePage from './HomePage';
import '../App.css'


function App() {
  return (
    <div className='parent-div h-auto w-full bg-[#DFF5FF]'>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='*' element={<Error404/>} />
        <Route path='/notes/:name' element={<NotesPage/>}/>
        <Route path='/logout' element={<Logout/>}/>



      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
