import axios from "axios";
import { ToastNotification } from "./ToastNotification";
import { useState } from "react";

export function NewType() {
  const [showToast, setShowToast] = useState(false);

  const handleSearch = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/types.json", params)
      .then((response) => {
        console.log(response);
        event.target.reset();
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div>
      <h1>Add New Type:</h1>
      {showToast && <ToastNotification message="Successfully added to the database!" />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="type_name">Add Type</label>
        <input type="text" name="type_name" />
        <button type="submit">Add Type</button>
      </form>
    </div>
  );
}
