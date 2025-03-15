import React, { useState } from 'react';
import axios from 'axios';
import '../admin/AddBook.css';

function AddBook() {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publication, setPublication] = useState('');
  const [dateOfPublication, setDateOfPublication] = useState('');
  const [price, setPrice] = useState('');
  const [bookAvailable, setBookAvailable] = useState(true);
  const [smsg, setSmsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookData = {
      bookId,
      title,
      author,
      publication,
      dateOfPublication,
      price,
      bookAvailable,
    };

    axios.get(`http://localhost:3000/admin-api/book/${bookId}`)
      .then(response => {
        if (response.data.payload) {
          setSmsg('Book already exists');
        } else {
          axios.post('http://localhost:3000/admin-api/book', bookData)
            .then(response => {
              setSmsg("Book Successfully added");
            })
            .catch(error => {
              setSmsg("Error adding book");
            });
        }
      })
      .catch(error => {
        setSmsg("Error checking book existence");
      });
  };

  const handleClearMsg = () => {
    setSmsg('');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="form-card p-4 shadow-lg rounded">
        <div className="mb-3">
          <label className="form-label">Book ID:</label>
          <input
            type="text"
            className="form-control"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Publication:</label>
          <input
            type="text"
            className="form-control"
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Publication:</label>
          <input
            type="text"
            className="form-control"
            value={dateOfPublication}
            onChange={(e) => setDateOfPublication(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Book Available:</label>
          <input
            type="checkbox"
            checked={bookAvailable}
            onChange={() => setBookAvailable(!bookAvailable)}
            className="form-check-input"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
      </form>

      {smsg && (
        <div className="alert alert-info mt-4 d-flex justify-content-between align-items-center">
          <span>{smsg}</span>
          <button className="btn btn-sm btn-primary" onClick={handleClearMsg}>OK</button>
        </div>
      )}
    </div>
  );
}

export default AddBook;
