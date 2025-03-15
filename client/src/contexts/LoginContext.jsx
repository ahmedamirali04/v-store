import React from 'react'
import { createContext,useState } from 'react'
export const loginContextObj=createContext();

function LoginContext({children}) {
    const [currentUser,setCurrentUser]=useState({
        email:'',
        name:'',
        role:'',
        rollNumber:'',
        staffNumber:''
    })


  return (
    <loginContextObj.Provider value={{currentUser,setCurrentUser}}>
        {children}
    </loginContextObj.Provider>
  )
}

export default LoginContext