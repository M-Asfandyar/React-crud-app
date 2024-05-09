import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    // Include token in the request headers
    axios.get(`https://crud-app-rjz5.onrender.com`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => setUsers(result.data))
    .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      // Include token in the request headers
      axios.delete(`https://crud-app-rjz5.onrender.com/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-md-10'>
          <div className='bg-white rounded p-3'>
            <Link to='/create' className='btn btn-primary mb-3'>Add +</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user) => {
                    return <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <Link to={`/update/${user._id}`} className='btn btn-primary mr-2'>Update</Link>
                        <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
