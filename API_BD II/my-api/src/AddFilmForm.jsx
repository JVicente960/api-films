import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function AddFilmForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    trailer_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000', formData)
      .then(response => {
        alert('Film added successfully');
        console.log('Film added successfully:', response.data);
        // Optionally, clear the form after successful submission
        setFormData({
          title: '',
          description: '',
          trailer_url: ''
        });
      })
      .catch(error => {
        console.error('Error adding film:', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="trailer_url">Trailer URL:</label>
        <input
          type="url"
          id="trailer_url"
          name="trailer_url"
          value={formData.trailer_url}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Film</button>
        <Link to="/">
            <button className="btn btn-success">Home</button>
        </Link>
      </form>
    </div>
  );
}

export default AddFilmForm;
