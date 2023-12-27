import axios from "axios";
import { useEffect, useState } from "react";

export function UserPlantsShow(props) {
  const initialWateringSchedules = Array.isArray(props.plant.watering_schedules)
    ? props.plant.watering_schedules.map((schedule) => schedule.schedule)
    : [];

  const initialFertilizerSchedules = Array.isArray(props.plant.fertilizer_schedules)
    ? props.plant.fertilizer_schedules.map((schedule) => schedule.schedule)
    : [];

  const [zones, setZones] = useState([]);
  const [types, setTypes] = useState([]);
  const [wateringSchedules, setWateringSchedules] = useState(initialWateringSchedules);
  const [fertilizerSchedules, setFertilizerSchedules] = useState(initialFertilizerSchedules);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdatePlant(props.plant.id, params);
    props.closeModal();
    event.target.reset();
    console.log("params", params);
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

  const handleWaterScheduleChange = (index, newValue) => {
    const updatedWateringSchedules = [...wateringSchedules];
    updatedWateringSchedules[index] = newValue;
    setWateringSchedules(updatedWateringSchedules);
  };

  const handleFertilizerScheduleChange = (index, newValue) => {
    const updatedFertilizerSchedules = [...fertilizerSchedules];
    updatedFertilizerSchedules[index] = newValue;
    setFertilizerSchedules(updatedFertilizerSchedules);
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
          <select name="zone_id" defaultValue={props.plant.zone_name} id="zone_id">
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
          {wateringSchedules.map((schedule, index) => (
            <input
              key={index}
              type="text"
              value={schedule}
              onChange={(e) => handleWaterScheduleChange(index, e.target.value)}
            ></input>
          ))}
        </div>
        <div className="form-group">
          <strong>Fertilizer Schedules:</strong>
          {fertilizerSchedules.map((schedule, index) => (
            <input
              key={index}
              type="text"
              value={schedule}
              onChange={(e) => handleFertilizerScheduleChange(index, e.target.value)}
            ></input>
          ))}
        </div>
        <button type="submit">Update</button>
        <button>Delete</button>
      </form>
    </div>
  );
}
