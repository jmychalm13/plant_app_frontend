import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  let authLinks;
  if (localStorage.jwt === undefined) {
    authLinks = (
      <>
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </>
    );
  } else {
    authLinks = <LogoutLink />;
  }
  return (
    <header>
      <nav>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/new">
          New Plant
        </Link>
        <Link className="nav-link" to="/search">
          Search
        </Link>
        <Link className="nav-link" to="/new_type">
          New Type
        </Link>
        <Link className="nav-link" to="/new_zone">
          New Zone
        </Link>
        <Link className="nav-link" to="/new_water">
          New Water
        </Link>
        {authLinks}
      </nav>
    </header>
  );
}
