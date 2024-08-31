import React, { createContext, useContext, useState } from "react"

export const ThemeContext = createContext(null);
export const useThemeContext = ()=>{
    return useContext(ThemeContext);
  } 

export const ThemeProvider = (props)=>{
  const [theme, setTheme] = useState(true);
  return(
   <ThemeContext.Provider value={{theme, setTheme}}>
    {props.children}
   </ThemeContext.Provider>
  )
}

const Theme = () => {
  return (
    <div></div>
  )
}

export default Theme