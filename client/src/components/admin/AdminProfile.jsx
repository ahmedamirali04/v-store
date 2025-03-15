import React from 'react';
import Header from '../common/Header';
import Books from '../common/Books';
import '../admin/AdminProfile.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminProfile() {
  const navigate = useNavigate();

  const handleBackToBooks = () => {
    navigate('');
  };

  const handleAddBook = () => {
    navigate('addBook');
  };

  const handlePendingRequests = () => {
    navigate('requests');
  };

  return (
    <div className="admin-profile bg-grey">
      <div className="mt-0">
        <div className="row justify-content-center p-3">
          <div className="col-12 col-md-8">
            <div className="card p-4 rounded bg-transparent border-0">
              <div className="row text-center">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <button
                    className="btn btn-lg btn-outline-primary w-100 p-3 m-3"
                    onClick={handleBackToBooks}
                  >
                    View All Books
                  </button>
                </div>
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <button
                    className="btn btn-lg btn-outline-success w-100 p-3 m-3"
                    onClick={handleAddBook}
                  >
                    Add New Book
                  </button>
                </div>
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <button
                    className="btn btn-lg btn-outline-warning w-100 p-3 m-3"
                    onClick={handlePendingRequests}
                  >
                    View Pending Requests
                  </button>
                </div>
                <div className="col-12 col-md-6">
                  <button
                    className="btn btn-lg btn-outline-info w-100 p-3 m-3"
                    onClick={() => {
                      navigate('collect');
                    }}
                  >
                    View Books Given
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
