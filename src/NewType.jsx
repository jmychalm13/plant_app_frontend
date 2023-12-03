import axios from "axios";
import { useState } from "react";

export function NewType() {
  const [status, setStatus] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/types.json", params)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error", error);
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add New Type:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type_name">Add Type</label>
        <input type="text" name="type_name" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
