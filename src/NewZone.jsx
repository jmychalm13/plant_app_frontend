import axios from "axios";
import { ToastNotification } from "./ToastNotification";
import { useState } from "react";

export function NewZone() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/zones.json", params)
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
    <div className="container text-center">
      <h1>Add New Zone</h1>
      {showToast && <ToastNotification message="Successfully added to the database!" />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="location_name">Add Zone Name</label>
        <input type="text" name="location_name" />
        <label htmlFor="light_level">Light Level</label>
        <input type="text" name="light_level" />
        <button className="btn btn-primary" type="submit">
          Add Zone
        </button>
      </form>
    </div>
  );
}
