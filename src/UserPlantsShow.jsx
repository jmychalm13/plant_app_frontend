import axios from "axios";
import { useEffect, useState } from "react";

export function UserPlantsShow(props) {
  const [zones, setZones] = useState([]);
  const [types, setTypes] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getZoneValues = () => {
    axios.get("http://localhost:3000/dropdowns/zone.json").then((response) => {
      setZones(response.data);
    });
  };

  const getTypeValues = () => {
    axios.get("http://localhost:3000/dropdowns/type.json").then((response) => {
      setTypes(response.data);
    });
  };

  useEffect(getZoneValues, []);
  useEffect(getTypeValues, []);

  return (
    <div className="container">
      <h2>{props.plant.name}</h2>
      <h5>{props.plant.type_name}</h5>
      <h3>Edit Plant</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <strong>Image:</strong>{" "}
          <input type="text" className="form-control" name="img_url" defaultValue={props.plant.img_url} />
        </div>
        <div className="form-group">
          <strong>Zone:</strong>
          <select name="zone_name" defaultValue={props.plant.zone_name} id="zone_name">
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.location_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <strong>Type:</strong>
          <select name="type_name" defaultValue={props.plant.type_name} id="type_name">
            {types.map((type) => (
              <option key={type.id} defaultValue={props.plant.type_name} id="type_name">
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <strong>Watering Schedules:</strong>
          {props.plant.watering_schedules.map((schedule, index) => (
            <p key={index}>{schedule.schedule}</p>
          ))}
        </div>
        <div className="form-group">
          <strong>Fertilizer Schedules:</strong>
          {props.plant.fertilizer_schedules.map((schedule, index) => (
            <p key={index}>{schedule.schedule}</p>
          ))}
        </div>
      </form>
    </div>
  );
}
