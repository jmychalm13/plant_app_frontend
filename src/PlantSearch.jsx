import axios from "axios";
import { useState } from "react";

export function PlantSearch() {
  const [info, setInfo] = useState({});
  const [formSubmitted, updateFormSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData(event.target);
    // let returnedData;
    axios.post("http://localhost:3000/details.json", formData).then((response) => {
      // setting variable here to use in component
      if (response.status !== 200) {
        throw new Error("network response was not okay.");
      } else {
        setInfo(response.data);
        updateFormSubmitted(true);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-outline">
        <input type="search" id="form1" className="form-control" name="name" />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {!formSubmitted ? (
        <h1>Please enter a search term...</h1>
      ) : info ? (
        <div>
          <div className="returned_data">
            <h1>{info["Name"]}</h1>
            <img src={info["Image"]} alt="" />
            <h3>General Care Instructions</h3>
            <p>{info["Care"]}</p>
            <h3>Possible Problems</h3>
            <p>{info["Difficulties"]}</p>
            <h3>Lighting Requirements</h3>
            <p>{info["Lighting"]}</p>
            <h3>Humidity Requirements</h3>
            <p>{info["Humidity"]}</p>
            <h3>Watering Requiremnts</h3>
            <p>{info["Watering"]}</p>
            <h3>Propagation Techniques</h3>
            <p>{info["Reproduction"]}</p>
            <h3>Soil Suggestion</h3>
            <p>{info["Soil"]}</p>
            <h3>Repotting Suggestion</h3>
            <p>{info["Transfer"]}</p>
          </div>
          <div>
            <p>Would you like to add this type to your database?</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>That plant is not in the database.</h1>
          <p>Would you like to add it anyway?</p>
        </div>
      )}
    </div>
  );
}
