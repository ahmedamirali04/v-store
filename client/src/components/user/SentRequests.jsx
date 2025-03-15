import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { loginContextObj } from '../../contexts/loginContext';
import { useNavigate } from 'react-router-dom';

function SentRequests() {
  const navigate = useNavigate();
  const { currentUser } = useContext(loginContextObj);
  const [listOfRequests, setListOfRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/user-api/request/${currentUser.email}`)
      .then(response => {
        setListOfRequests(response.data.payload);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred while fetching requests.");
        setLoading(false);
      });
  }, [currentUser.email]);

  const handleRoleSet = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="text-center">
          <p className="text-muted">Loading requests...</p>
        </div>
      ) : error ? (
        <div className="text-center text-danger">
          <p>{error}</p>
        </div>
      ) : listOfRequests.length > 0 ? (
        <div>
          <h3 className="text-center mb-4">Pending Book Requests</h3>
          <div className="row">
            {listOfRequests.map((request, index) => (
              request.status === 'pending' && (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{request.title}</h5>
                      <p className="card-text"><strong>Author:</strong> {request.author}</p>
                      <p className="card-text"><strong>Status:</strong> {request.status}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>No pending requests found.</p>
        </div>
      )}
    </div>
  );
}

export default SentRequests;
