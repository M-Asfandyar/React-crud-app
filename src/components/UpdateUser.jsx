import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch CSRF token from cookies
    const csrfToken = Cookies.get("XSRF-TOKEN");
    // Include CSRF token in the default headers for Axios
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const token = localStorage.getItem("token"); // Retrieve token from local storage
    axios
      .get(`https://crud-app-rjz5.onrender.com/getUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      })
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    axios
      .put(
        `https://crud-app-rjz5.onrender.com/updateUser/${id}`,
        { name, email, age },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      )
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={handleUpdate}>
        <h2 className="mt-5 mb-4">Update User</h2>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            className="form-control"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
