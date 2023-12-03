import axios from "axios";
import { Link } from "react-router-dom";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Link className="nav-link" to="#" onClick={handleClick}>
      Logout
    </Link>
  );
}
