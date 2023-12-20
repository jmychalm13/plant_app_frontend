import axios from "axios";
import { useState } from "react";
import { ToastNotification } from "./ToastNotification";

export function PlantSearch() {
  const [info, setInfo] = useState({});
  const [formSubmitted, updateFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
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

  const addType = () => {
    const params = {
      type_name: info["Name"],
    };
    console.log(params);
    axios
      .post("http://localhost:3000/types.json", params)
      .then((response) => {
        console.log(response);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div className="text-center">
      {!formSubmitted ? (
        <div>
          <h1>Type Search</h1>
          <form onSubmit={handleSubmit} className="form-group">
            <input type="text" id="form1" className="form-control" name="name" placeholder="Search Term" />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
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
            <h3>Would you like to add this type to your database?</h3>
            {showToast && <ToastNotification message="Type successfully added to the database!" />}
            <button onClick={addType} className="btn btn-primary">
              Yes
            </button>
            <button className="btn btn-primary">No</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>That plant is not in the database.</h3>
        </div>
      )}
    </div>
  );
}
