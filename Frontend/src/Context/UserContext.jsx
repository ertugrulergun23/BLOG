import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [islogged, setIslogged] = useState(false);
  const [profile,setProfile] = useState({})

  const value = { islogged, setIslogged, profile, setProfile};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};