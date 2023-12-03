import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/new">New Plant</Link> | <Link to="/search">Search</Link> |{" "}
        <Link to="/new_type">New Type</Link> | <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
