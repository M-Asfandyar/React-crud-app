import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch CSRF token from cookies
    const csrfToken = Cookies.get("XSRF-TOKEN");
    // Include CSRF token in the default headers for Axios
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const fetchUsers = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        // Include token in the request headers
        const response = await axios.get("https://crud-app-rjz5.onrender.com", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmed) {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        // Include token in the request headers
        await axios.delete(
          `https://crud-app-rjz5.onrender.com/deleteUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Refresh the user list after deletion
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="bg-white rounded p-3">
            <Link to="/create" className="btn btn-primary mb-3">
              Add +
            </Link>
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
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-primary mr-2"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
