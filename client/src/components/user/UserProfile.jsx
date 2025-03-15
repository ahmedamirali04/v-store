import React from 'react'
import Header from '../common/Header'
import Books from '../common/Books'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className="user-profile-container bg-grey">
      <div className='d-flex p-4 m-3 rounded justify-content-evenly'>
        <button 
          className='btn btn-primary btn-lg user-profile-btn m-1'
          onClick={() => { navigate('/user-profile') }}
        >
          View All Books
        </button>
        <button 
          className='btn btn-primary btn-lg user-profile-btn m-1'
          onClick={() => { navigate('/user-profile/requests') }}
        >
          View Pending Requests
        </button>
      </div>
      <div className=".leoutlet">
        <Outlet />
      </div>
    </div>
  )
}

export default UserProfile
