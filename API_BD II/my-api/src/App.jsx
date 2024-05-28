import MyComponent from './MyComponent.jsx'
import AddFilmForm from './AddFilmForm.jsx'
import UpdateFilmForm from './UpdateFilmForm.jsx'


import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  return(
    <Router>
        <Routes>
          <Route path="/" element={<MyComponent/>} />
          <Route path="/add" element={<AddFilmForm/>} />
          <Route path="/update/:id" element={<UpdateFilmForm/>} />
        </Routes>
    </Router>
  );
}

export default App
