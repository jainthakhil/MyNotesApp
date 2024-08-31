// import React, { createContext, useContext, useState } from "react"

// export const ThemeContext = createContext(null);
// export const useThemeContext = ()=>{
//     return useContext(ThemeContext);
//   } 

// export const ThemeProvider = (props)=>{
//   const [theme, setTheme] = useState(true);
//   return(
//    <ThemeContext.Provider value={{theme, setTheme}}>
//     {props.children}
//    </ThemeContext.Provider>
//   )
// }

// const Theme = () => {
//   return (
//     <div></div>
//   )
// }

// export default Theme




import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = (props) => {
  // Initialize theme from local storage or default to light mode (true)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true; // true for light mode, false for dark mode
  });

  useEffect(() => {
    // Save the theme to local storage whenever it changes
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const Theme = () => {
  return (
    <div></div>
  );
};

export default Theme;
