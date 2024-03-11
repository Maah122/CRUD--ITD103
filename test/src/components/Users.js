import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Importing the CSS file

function Users() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
      .then(res => {
        console.log(res);
        fetchData();
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex vh-100 bg-custom-primary justify-content-center align-items-center">
      <div className="w-75 bg-custom-white rounded p-3 shadow">
        {/* Search Bar */}
        <div className="mb-3 mt-3">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        {/* Add New User Link */}
        <Link to="/create" className="btn btn-custom-success btn-sm mb-3">
          Add +
        </Link>
        {/* Table to display users */}
        <table className="table table-custom table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-custom-primary btn-sm me-2">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-custom-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
