import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  let authLinks;
  if (localStorage.jwt === undefined) {
    authLinks = (
      <>
        <li>
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </>
    );
  } else {
    authLinks = (
      <li className="nav-item">
        <LogoutLink />
      </li>
    );
  }
  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/new">New Plant</Link> | <Link to="/search">Search</Link> |{" "}
        <Link to="/new_type">New Type</Link> | <Link to="/new_zone">New Zone</Link> | {authLinks}
      </nav>
    </header>
  );
}
