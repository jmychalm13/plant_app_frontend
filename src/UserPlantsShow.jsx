import axios from "axios";
import { useEffect, useState } from "react";

export function UserPlantsShow(props) {
  const [zones, setZones] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedZoneId, setSelectedZoneId] = useState(props.plant.zone_id);
  const [selectedTypeId, setSelectedTypeId] = useState(props.plant.type_id);
  const [initialZone, setInitialZone] = useState(props.plant.zone_id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    params.set("zone_id", selectedZoneId);
    params.set("type_id", selectedTypeId);
    props.onUpdatePlant(props.plant.id, params);
    props.closeModal();
    event.target.reset();
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

  const handleClick = () => {
    props.onDestroyPlant(props.plant.id);
  };

  const handleZoneChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedZoneId(selectedValue);
  };

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTypeId(selectedValue);
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
          <select
            className="form-select"
            name="zone_id"
            defaultValue={initialZone}
            id="zone_id"
            onChange={handleZoneChange}
          >
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.location_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <strong>Type:</strong>
          <select
            className="form-select"
            name="type_name"
            defaultValue={props.plant.type_id}
            id="type_name"
            onChange={handleTypeChange}
          >
            {types.map((type) => (
              <option key={type.id} value={type.id} id="type_name">
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <strong>Watering Schedules:</strong>
        </div>
        <div className="form-group">
          <strong>Fertilizer Schedules:</strong>
        </div>
        <button type="submit">Update</button>
        <button onClick={handleClick}>Delete</button>
      </form>
    </div>
  );
}
