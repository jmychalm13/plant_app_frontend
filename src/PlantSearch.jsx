import axios from "axios";
import { useState } from "react";

export function PlantSearch() {
  const [plants, setPlants] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData(event.target);
    axios.post("http://localhost:3000/details.json", formData).then((response) => {
      setPlants(response.data);
      console.log(plants[0]["item"]);
    });
  };

  return (
    <div>
      <div className="input-group">
        <form onSubmit={handleSubmit} className="form-outline">
          <input type="search" id="form1" className="form-control" name="name" />
          <label className="form-label" htmlFor="form1">
            Search
          </label>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <div>
          <h3>Common Names</h3>
          {/* {plants[0]["item"]["Common name"].map((name) => (
            <p key={plants[0]["id"]}>{name}</p>
          ))} */}
        </div>
      </div>
    </div>
  );
}
