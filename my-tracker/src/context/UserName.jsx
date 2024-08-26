import React, { useContext, createContext, useState, useEffect } from "react";

export const UserNameContext = createContext(null);

export const useUserContext = () => {
    return useContext(UserNameContext);
}

export const Provider = (props) => {
    const [userName, setUserName] = useState(() => {
        // Initialize from localStorage or default to empty string
        return localStorage.getItem('userName') || '';
    });

    const [isLoggedin, setIsLoggedin] = useState(() => {
        // Initialize from localStorage or default to false
        return JSON.parse(localStorage.getItem('isLoggedin')) || false;
    });

    useEffect(() => {
        // Save userName and isLoggedin to localStorage when they change
        localStorage.setItem('userName', userName);
        localStorage.setItem('isLoggedin', JSON.stringify(isLoggedin));
    }, [userName, isLoggedin]);

    return (
        <UserNameContext.Provider value={{ userName, setUserName, isLoggedin, setIsLoggedin }}>
            {props.children}
        </UserNameContext.Provider>
    );
}

const UserName = () => {
    return (
        <div></div>
    )
}

export default UserName;
