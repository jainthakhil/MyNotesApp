import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Signin from './Signin';
import Error404 from './Error404';
import NotesPage from './Notespage';
import Logout from './Logout';
import HomePage from './HomePage';
import '../App.css'
import '../styles.css'
import bgLightImage from '../images/lightbg2.jpg' 
import bgDarkImage from '../images/nightbg3.jpg' 
import { useThemeContext } from '../context/Theme';



function App() {
  const ThemeContext = useThemeContext();
  return (
    <div className='parent-div min-h-[100vh] w-full bg-no-repeat bg-cover bg-center bg-fixed' style={{ backgroundImage: `url(${ThemeContext.theme ? bgLightImage : bgDarkImage})`}}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='*' element={<Error404/>} />
        <Route path='/notes' element={<NotesPage/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;