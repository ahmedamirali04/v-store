import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { loginContextObj } from '../../contexts/loginContext';
import '../common/Header.css';

function Header() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  async function handleSignout() {
    await signOut();
    setCurrentUser(null);
    navigate('/');
  }
  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light header'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            LOGO
          </Link>
          
          <ul className='navbar-nav ml-auto'>
            {!isSignedIn ? (
              <>
                <li className='nav-item'>
                  <Link to='/' className='nav-link header-link'>Home</Link>
                </li>
                <li className='nav-item'>
                  <Link to='signin' className='nav-link header-link'>Signin</Link>
                </li>
                <li className='nav-item'>
                  <Link to='signup' className='nav-link header-link'>Signup</Link>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <button className='btn btn-danger' onClick={handleSignout}>Sign out</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
