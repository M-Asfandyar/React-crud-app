import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('https://crud-app-rjz5.onrender.com/createUser', { name, email, age }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
            <form onSubmit={handleSubmit}>
              <h2 className="mt-5 mb-4">Add User</h2>
              <div className="mb-3">
                <label htmlFor='name' className="form-label">Name</label>
                <input type="text" id='name' className="form-control" placeholder='Enter Name'
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' className="form-control" placeholder='Enter Email'
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor='age'>Age</label>
                <input type="text" id='age' className="form-control" placeholder='Enter Age'
                  value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default CreateUser;
