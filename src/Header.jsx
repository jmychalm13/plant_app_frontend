import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  let authLinks;
  if (localStorage.jwt === undefined) {
    authLinks = (
      <>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </>
    );
  } else {
    authLinks = <LogoutLink />;
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src="src/assets/logo-transparent-png.png" width="45" height="45" alt="" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Add New
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/new">
                New Plant
              </Link>
              <Link className="dropdown-item" to="/new_type">
                New Type
              </Link>
              <Link className="dropdown-item" to="/new_zone">
                New Zone
              </Link>
              <Link className="dropdown-item" to="/new_water">
                New Watering Schedule
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              Search
            </Link>
          </li>
        </ul>
      </div>
      {authLinks}
    </nav>
    // <header>
    //   <nav>
    //     <Link className="nav-link" to="/">
    //       Home
    //     </Link>
    //     <Link className="nav-link" to="/new">
    //       New Plant
    //     </Link>
    //     <Link className="nav-link" to="/search">
    //       Search
    //     </Link>
    //     <Link className="nav-link" to="/new_type">
    //       New Type
    //     </Link>
    //     <Link className="nav-link" to="/new_zone">
    //       New Zone
    //     </Link>
    //     <Link className="nav-link" to="/new_water">
    //       New Water
    //     </Link>
    //     {authLinks}
    //   </nav>
    // </header>
  );
}
