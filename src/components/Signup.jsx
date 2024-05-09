import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('https://crud-app-rjz5.onrender.com/register', formData, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      console.log('Signup successful:', response.data);
      alert('New Admin has been added.');
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error.response.data);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      {showConfirmation && (
        <div className="mt-3">
          <p>Are you sure you want to register?</p>
          <button className="btn btn-success me-2" onClick={handleConfirmation}>Yes</button>
          <button className="btn btn-danger" onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
