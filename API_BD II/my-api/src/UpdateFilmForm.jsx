import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Link, redirect} from "react-router-dom";


function UpdateFilmForm() {
  let { id } = useParams();
  
  const [filmDetails, setFilmDetails] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    trailer_url: ''
  });

  useEffect(() => {
      axios.get(`http://localhost:3000/${id}`)
        .then(response => {
          setFilmDetails(response.data);
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching film details:', error);
          setFilmDetails(null);
        });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/${id}`, formData)
      .then(response => {
        alert('Film updated successfully');
        console.log('Film updated successfully:', response.data);
        // Optionally, redirect or display a success message
      })
      .catch(error => {
        console.error('Error updating film:', error);
      });
  };

  return (
    <div>
      {filmDetails && (
        <div className="form-container">
          <form >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formData.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              defaultValue={formData.description}
              onChange={handleChange}
              required
            />
            <label htmlFor="trailer_url">Trailer URL:</label>
            <input
              type="url"
              id="trailer_url"
              name="trailer_url"
              defaultValue={formData.trailer_url}
              onChange={handleChange}
              required
            />
            <button onClick={handleSubmit} type="submit">Update Film</button>
          </form> <br />
          <Link to="/">
            <button className="btn btn-success">Home</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UpdateFilmForm;
