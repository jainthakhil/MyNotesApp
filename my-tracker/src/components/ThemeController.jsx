import React from 'react'
import { useThemeContext } from '../context/Theme'
import sunImage from '../images/sun.png'
import moonimage from '../images/moon.png'



const ThemeController = () => {
  const ThemeContext = useThemeContext();
    const handleClick = ()=>{
        ThemeContext.setTheme(!ThemeContext.theme);
    }
    
  return (
    <div className='w-full h-16 flex items-center justify-end'>
    <div className="theme-box w-8 h-8 mr-12">
        <button onClick={handleClick} className='w-full h-full '>
        <img src={ThemeContext.theme? moonimage:sunImage} alt="" />
        </button>
    </div>

    </div>
  )
}

export default ThemeController