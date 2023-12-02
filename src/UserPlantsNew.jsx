import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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

  useEffect(getTypeValues, []);
  useEffect(getZoneValues, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Image URL: <input name="img_url" type="text" />
        </div>
        <div>
          Type:
          <select name="type_id" id="type_id">
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Zone:
          <select name="zone_id" id="zone_id">
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.location_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Plant</button>
      </form>
    </div>
  );
}
