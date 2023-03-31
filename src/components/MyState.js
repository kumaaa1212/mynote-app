import React, { createContext, useState } from 'react'


export const MyNote =createContext();
const MyState = ({children}) => {
  const [notes,setnotes] =useState(JSON.parse(localStorage.getItem('notes'))|| []);
  return (
    <>
    <MyNote.Provider value={[notes,setnotes]}>
      {children}
    </MyNote.Provider>
    </>
  )
}
export default MyState