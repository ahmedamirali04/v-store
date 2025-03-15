import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { loginContextObj } from '../../contexts/loginContext';
import { useNavigate, Link } from 'react-router-dom';
import '../common/Books.css';

function Books() {
  const navigate = useNavigate();
  const [listOfBooks, setListOfBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const { currentUser, setCurrentUser } = useContext(loginContextObj);
  const [leRes, setLeRes] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin-api/books')
      .then((response) => {
        setListOfBooks(response.data.payload);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
      });
  }, []);

  const filteredBooks = listOfBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBookRequest = (givenBookId) => {
    axios.get(`http://localhost:3000/admin-api/book/${givenBookId}`)
      .then(response => {
        axios.post('http://localhost:3000/user-api/request', {
          name: currentUser.name,
          email: currentUser.email,
          bookId: givenBookId,
          title: response.data.payload.title,
          author: response.data.payload.author
        })
        .then((response) => {
          setLeRes("Request Sent!");
        })
        .catch(err => {
          console.error(err);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleRoleSet = () => {
    navigate('/');
  }

  return (
    <div className="">
      {
        currentUser.role ? (
          <div className="search-container mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by book title..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <p className='text-success mt-2'>{leRes}</p>
          </div>
        ) : (
          <button className='btn btn-danger p-3 m-3' onClick={handleRoleSet}>Session Expired, please click here</button>
        )
      }
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="row">
          {filteredBooks.map((book) => (
            <div key={book.bookId} className="col-md-6 mb-4">
              <div className="card book-card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text"><strong>Author:</strong> {book.author}</p>
                  <p className="card-text"><strong>Publication:</strong> {book.publication}</p>
                  <p className="card-text"><strong>Date Published:</strong> {book.dateOfPublication}</p>
                  <p className="card-text"><strong>Price:</strong> ${book.price}</p>
                  <p className="card-text"><strong>Available:</strong> {book.bookAvailable ? "Yes" : "No"}</p>
                  {currentUser.role === 'staff' && (
                    <Link to={`updateBook/${book.bookId}`} className="btn btn-warning w-100">Edit Book</Link>
                  )}
                  {currentUser.role === 'user' && (
                    <button className="btn btn-primary w-100 mt-2" onClick={() => handleBookRequest(book.bookId)}>
                      Send Book Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
