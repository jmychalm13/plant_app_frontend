import axios from "axios";
import { ToastNotification } from "./ToastNotification";
import { useState, useEffect } from "react";

export function FertilizerScheduleNew() {
  const [plants, setPlants] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const getPlantValues = () => {
    axios.get("http://localhost:3000/dropdowns/plant.json").then((response) => {
      setPlants(response.data);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/fertilizer_schedules.json", params)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
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

  useEffect(getPlantValues, []);

  return (
    <div className="container">
      <h1>New Fertilizer Schedule</h1>
      {showToast && <ToastNotification message="Schedule successfully added to the database!" />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_plant_id">Plant:</label>
        <select name="user_plant_id" id="user_plant_id">
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
        <label htmlFor="schedule">Schedule:</label>
        <input type="text" name="schedule" />
        <button className="btn btn-primary" type="submit">
          Add Schedule
        </button>
      </form>
    </div>
  );
}
