import React, { useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { loginContextObj } from '../../contexts/loginContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const { currentUser, setCurrentUser } = useContext(loginContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
  const [newRollNo, setNewRollNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isLoaded && user) { 
      console.log("First read", user);
      if (isLoaded) {
        setCurrentUser({
          ...currentUser,
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          role: 'user',
        });

        console.log("curr user", currentUser);
      }

      axios.post("http://localhost:3000/user-api/adminexists", {
        email: user.emailAddresses[0].emailAddress,
      })
        .then(response => {
          if (response.data.exists) {
            console.log("This the role change", currentUser);
            axios.post("http://localhost:3000/admin-api/getadmin", {
              email: user.emailAddresses[0].emailAddress,
            })
              .then(response => {
                console.log("LE FOUND IT", response.data.payload.staffId);
                setNewRollNo(response.data.payload.staffId)
              })
              .catch(err => { console.error(err) });
            setCurrentUser({
              ...currentUser,
              name: user.fullName,
              email: user.emailAddresses[0].emailAddress,
              role: 'staff',
            });
            console.log("Email exists in the admin database.");
          } else {
            axios.post('http://localhost:3000/user-api/userexists', {
              email: user.emailAddresses[0].emailAddress,
            })
              .then(response => {
                if (response.data.exists) {
                  console.log("Email exists in the user database.");
                } else {
                  addToDb();
                }
              })
              .catch(error => {
                console.error('Error checking email:', error);
              });
          }
        });

      if (currentUser.role === 'staff') {
        axios.post('http://localhost:3000/admin-api/getadmin', {
          email: user.emailAddresses[0].emailAddress,
        })
          .then(response => {
            if (response.data.staffId) {
              setCurrentUser(prevState => ({
                ...prevState,
                staffNumber: response.data.staffId,
              }));
            }
          })
          .catch(error => {
            console.error('Error fetching roll number:', error);
          });
      }

    }
  }, [isLoaded, user]);

  const addToDb = () => {
    axios.post('http://localhost:3000/user-api/user', {
      name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
    })
      .then(response => {
        console.log('User added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding user to the database:', error);
      });
  };

  useEffect(() => {
    if (currentUser.role === 'staff') {
      if (currentUser?.staffNumber) {
        setErrorMessage("staffNumber is already set.");
        return;
      }

      setCurrentUser(prevState => ({
        ...prevState,
        staffNumber: newRollNo, 
      }));
    }
  }, [newRollNo]);

  const handleMainPageNav = () => {
    if (currentUser?.role === 'user') {
      navigate(`/user-profile`);
    }
    if (currentUser?.role === 'staff') {
      if (currentUser.staffNumber) {
        navigate(`/admin-profile`);
      }
    }
  }

  return (
    <div className="home-container">
      <div className="user-info-card">
        {isSignedIn ? (
          <>
            <p><strong>Name:</strong> {currentUser?.name || 'Loading...'}</p>
            <p><strong>Email:</strong> {currentUser?.email || 'Loading...'}</p>
            <p><strong>Role:</strong> {currentUser?.role || 'Loading...'}</p>

            {currentUser?.role === 'staff' && (
              <div>
                <p><strong>Staff ID:</strong> {currentUser?.staffNumber || 'Loading...'}</p>
              </div>
            )}

            <button className='btn btn-danger rounded p-3 m-3' onClick={handleMainPageNav}>Go To Books Catalogue</button>
          </>
        ) : (
          <p className='loading-text'><strong>Please Login</strong></p>
        )}
      </div>
    </div>
  );
}

export default Home;
