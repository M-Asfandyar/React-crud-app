import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Students Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {auth ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Add Student
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Add Admin
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link nav-log"
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link nav-log">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
