import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { loginContextObj } from '../../contexts/loginContext';
import { useNavigate } from 'react-router-dom';
import '../admin/RecievedRequests.css';

function RecievedRequests() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(loginContextObj);
  const [listOfRequests, setListOfRequests] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin-api/requests`)
      .then((response) => {
        setListOfRequests(response.data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleRoleSet = () => {
    navigate('/');
  };

  const handleApprove = (email, bookId) => {
    axios
      .put('http://localhost:3000/admin-api/updateRequest', {
        email: email,
        bookId: bookId,
        status: 'approved',
      })
      .then(() => {
        setMsg('Request Approved');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeny = (email, bookId) => {
    axios
      .delete('http://localhost:3000/admin-api/deleteRequest', {
        data: {
          email: email,
          bookId: bookId,
        },
      })
      .then((response) => {
        setMsg('Book Denied');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="mt-5">
      {listOfRequests.length > 0 ? (
        <div>
          {msg && <div className="alert alert-info p-3">{msg}</div>}
          <div className="row">
            {listOfRequests.map((request, index) =>
              request.status === 'pending' ? (
                <div key={index} className="col-12 col-md-6 mb-4">
                  <div className="card p-3 bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Requested By: {request.name}</h5>
                      <p className="card-text">
                        <strong>Email:</strong> {request.email}
                      </p>
                      <p className="card-text">
                        <strong>Book Title:</strong> {request.title}
                      </p>
                      <p className="card-text">
                        <strong>Author:</strong> {request.author}
                      </p>
                      <p className="card-text">
                        <strong>Request Status:</strong> {request.status}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn m-3 btn-success"
                          onClick={() => handleApprove(request.email, request.bookId)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn  m-3 btn-danger"
                          onClick={() => handleDeny(request.email, request.bookId)}
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      ) : (
        <button
          className="btn btn-danger p-3 m-3 w-100"
          onClick={handleRoleSet}
        >
          Session Expired, please click here
        </button>
      )}
    </div>
  );
}

export default RecievedRequests;
