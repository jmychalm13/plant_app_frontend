import axios from "axios";
import { useEffect, useState } from "react";
import { ToastNotification } from "./ToastNotification";

export function NewWater() {
  const [plants, setPlants] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/watering_schedules.json", params)
      .then((response) => {
        console.log(response);
        event.target.reset();
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.respose.data.errors);
      });
  };

  const getPlantValues = () => {
    axios.get("http://localhost:3000/dropdowns/plant.json").then((response) => {
      setPlants(response.data);
    });
  };

  useEffect(getPlantValues, []);

  return (
    <div>
      <h1>New Watering Schedule</h1>
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
