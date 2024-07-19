import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Signin from './Signin';
import Error404 from './Error404';
import Mainpage from './Mainpage';
import AddNewNote from './AddNewNote';
import NotesPage from './Notespage';
import Logout from './Logout';
import HomePage from './HomePage';

function App() {
  return (
    <div className='parent-div' style={{backgroundColor:'#f7f7f7'}}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='*' element={<Error404/>} />
        <Route path='/mainpage' element={<Mainpage/>}/>
        <Route path='/addnew' element={<AddNewNote/>}/>
        <Route path='/notes/:name' element={<NotesPage/>}/>
        <Route path='/logout' element={<Logout/>}/>



      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
