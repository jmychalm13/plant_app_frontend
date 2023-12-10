import axios from "axios";
import { useEffect, useState } from "react";
import { ToastNotification } from "./ToastNotification";

export function NewCutting() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/cuttings.json", params)
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
      <h1>New Cutting</h1>
      {showToast && <ToastNotification message="Cutting Created!" />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_plant_id">Plant ID</label>
        <input type="integer" name="user_plant_id" />
        <label htmlFor="zone_id">Zone ID</label>
        <input type="number" name="zone_id" />
        <label htmlFor="date_cut">Date Cut</label>
        <input type="date" name="date_cut" />
        <label htmlFor="roots">Roots</label>
        <input type="text" name="roots" />
        <button className="btn" type="submit">
          Add Cutting
        </button>
      </form>
    </div>
  );
}
