import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function MyComponent(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(response => {
        console.log(response.data); // Log the response data
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  function deleteFilm(id){
    axios.delete(`http://localhost:3000/${id}`)
      .then(response => {
        console.log(response.data); // Log the response data
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();
  }

  return (
    <div className="container">

      <Link to="/add">
        <button className="btn btn-success">Add Film</button>
      </Link>
    <br />
      
    <h2>Films:</h2>
    <ul className="films-list">
        {data && data.map(film => (
        <li key={film._id} className="film-item">
            <h3 className="film-title">{film.title}</h3>
            <p className="film-description">{film.description}</p>
            <a href={film.trailer_url} className="film-link" target='_blank'>Watch Trailer</a><br />
            <button className="delete-button" onClick={() => deleteFilm(film._id)}>Delete</button>
            <Link  to={`/update/${film._id}`}>
              <button className="btn btn-primary">Update Film</button>
            </Link>

        </li>
        ))}
  </ul>
</div>

  );
}

export default MyComponent;