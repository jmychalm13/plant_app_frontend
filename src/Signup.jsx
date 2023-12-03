import axios from "axios";

export function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios.post("http://localhost:3000/users.json", params).then((response) => {
      console.log(response.data);
      event.target.reset();
      window.location.href = "/login";
    });
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First name:</label>
        <input type="text" name="first_name" />
        <label htmlFor="last_name">Last name:</label>
        <input type="text" name="last_name" />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <label htmlFor="password_confirmation">Password Confirmation:</label>
        <input type="password" name="password_confirmation" />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
