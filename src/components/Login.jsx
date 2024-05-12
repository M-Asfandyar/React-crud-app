import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch CSRF token from cookies
    const csrfToken = Cookies.get("XSRF-TOKEN");
    // Include CSRF token in the default headers for Axios
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://crud-app-rjz5.onrender.com/login",
        formData
      );
      console.log("Login successful:", response.data);

      localStorage.setItem("token", response.data.token);
      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
