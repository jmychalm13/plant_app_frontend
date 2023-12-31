import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastNotification } from "./ToastNotification";

export function UserPlantsNew(props) {
  const [types, setTypes] = useState([]);
  const [zones, setZones] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateUserPlant(params, () => event.target.reset());
  };

  const getTypeValues = () => {
    axios.get("http://localhost:3000/dropdowns/type.json").then((response) => {
      setTypes(response.data);
    });
  };

  const getZoneValues = () => {
    axios.get("http://localhost:3000/dropdowns/zone.json").then((response) => {
      setZones(response.data);
    });
  };

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "new_type") {
      window.location.href = "/new_type";
    } else if (selectedValue === "new_zone") {
      window.location.href = "/new_zone";
    }
  };

  useEffect(getTypeValues, []);
  useEffect(getZoneValues, []);

  return (
    <div className="container">
      <h1>Add New Plant</h1>
      {props.toast && <ToastNotification message="Plant successfully added." />}
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <input name="name" type="text" className="form-control" />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-outline mb-4">
          <input name="img_url" type="text" className="form-control" />
          <label htmlFor="img_url" className="form-label">
            Image URL
          </label>
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="type" className="form-label">
            Choose Type
          </label>
          <select onChange={handleSelect} name="type_id" id="type_id">
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name}
              </option>
            ))}
            <option value="new_type">New Type</option>
          </select>
        </div>
        <div className="form-outline mb-4">
          <label htmlFor="zone" className="form-label">
            Choose Zone
          </label>
          <select onChange={handleSelect} name="zone_id" id="zone_id">
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.location_name}
              </option>
            ))}
            <option value="new_zone">New Zone</option>
          </select>
        </div>
        <button type="submit">Create Plant</button>
      </form>
    </div>
  );
}
