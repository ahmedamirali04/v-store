import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../admin/UpdateBook.css';

function UpdateBook() {
  const { bookId } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publication, setPublication] = useState('');
  const [dateOfPublication, setDateOfPublication] = useState('');
  const [price, setPrice] = useState('');
  const [bookAvailable, setBookAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/admin-api/book/${bookId}`)
        .then((response) => {
          const gotBookData = response.data.payload;
          setTitle(gotBookData.title);
          setAuthor(gotBookData.author);
          setPublication(gotBookData.publication);
          setDateOfPublication(gotBookData.dateOfPublication);
          setPrice(gotBookData.price);
          setBookAvailable(gotBookData.bookAvailable);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage('Failed to fetch book data.');
        })
        .finally(() => setLoading(false));
    }
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      publication,
      dateOfPublication,
      price,
      bookAvailable,
    };

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    axios
      .put(`http://localhost:3000/admin-api/book/${bookId}`, updatedBook)
      .then(() => {
        setSuccessMessage('Book updated successfully!');
        setTimeout(() => {
          navigate('/admin-profile');
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage('Error updating book. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-5">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        {loading && <div className="spinner-border text-primary" role="status"></div>}

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}

        <div className="form-group mt-3">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="publication">Publication:</label>
          <input
            type="text"
            id="publication"
            className="form-control"
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="dateOfPublication">Date of Publication:</label>
          <input
            type="text"
            id="dateOfPublication"
            className="form-control"
            value={dateOfPublication}
            onChange={(e) => setDateOfPublication(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="bookAvailable">Book Available:</label>
          <select
            id="bookAvailable"
            className="form-control"
            value={bookAvailable}
            onChange={(e) => setBookAvailable(e.target.value === 'true')}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBook;
