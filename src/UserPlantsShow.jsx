import axios from "axios";
import { useEffect, useState } from "react";

export function UserPlantsShow(props) {
  const [zones, setZones] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getZoneValues = () => {
    axios.get("http://localhost:3000/dropdowns/zone.json").then((response) => {
      setZones(response.data);
    });
  };

  // Todo: make this function work
  const updateZone = (event) => {
    console.log(event.target);
  };

  useEffect(getZoneValues, []);

  return (
    <div className="container">
      <h2>{props.plant.name}</h2>
      <h5>{props.plant.type_name}</h5>
      <h3>Edit Plant</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          Image: <input type="text" className="form-control" name="img_url" defaultValue={props.plant.img_url} />
        </div>
        <div className="form-group">
          Zone:
          <select
            name="zone_name"
            value={props.plant.zone_name}
            id="zone_name"
            onChange={(event) => updateZone(event.target)}
          >
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.location_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          Watering Schedules:
          {props.plant.watering_schedules.map((schedule, index) => (
            <p key={index}>{schedule.schedule}</p>
          ))}
        </div>
      </form>
    </div>
  );
}
