import React from 'react'
import {SignIn} from '@clerk/clerk-react'

function Signin() {
  return (
    <div className='mt-5 d-flex justify-content-center align-items-center h-100'>
      <SignIn/>
    </div>
  )
}

export default Signin