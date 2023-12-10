import axios from "axios";
import { useEffect, useState } from "react";
import { ToastNotification } from "./ToastNotification";

export function NewCutting() {
  const [plants, setPlants] = useState([]);
  const [zones, setZones] = useState([]);
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

  const getPlantValues = () => {
    axios.get("http://localhost:3000/dropdowns/plant.json").then((response) => {
      setPlants(response.data);
    });
  };

  const getZoneValues = () => {
    axios.get("http://localhost:3000/dropdowns/zone.json").then((response) => {
      setZones(response.data);
    });
  };

  useEffect(getPlantValues, []);
  useEffect(getZoneValues, []);

  return (
    <div>
      <h1>New Cutting</h1>
      {showToast && <ToastNotification message="Cutting Created!" />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_plant_id">Plant:</label>
        <select name="user_plant_id" id="user_plant_id">
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.name}
            </option>
          ))}
        </select>
        <label htmlFor="zone_id">Zone:</label>
        <select name="zone_id" id="zone_id">
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.location_name}
            </option>
          ))}
        </select>
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
