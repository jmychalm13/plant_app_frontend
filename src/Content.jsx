import axios from "axios";
import { useState, useEffect } from "react";
import { UserPlantsIndex } from "./UserPlantsIndex";
import { UserPlantsNew } from "./UserPlantsNew";

export function Content() {
  const [userPlants, setUserPlants] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJleHAiOjE3MDEyNTg3NjF9.cNIMlVAtEuFUSgsoR1srco3QXsuFzKvaYHFHR9oMrbo`,
  };

  const handleIndexUserPlants = () => {
    axios.get("http://localhost:3000/user_plants.json").then((response) => {
      console.log(response.data);
      setUserPlants(response.data);
    });
  };

  const handleCreateUserPlant = (params, successCallback) => {
    console.log("handleCreateUserPlant", params);
    axios
      .post("http://localhost:3000/user_plants.json", params, {
        headers: headers,
      })
      .then((response) => {
        setUserPlants([...userPlants, response.data]);
        successCallback();
      });
  };

  useEffect(handleIndexUserPlants, []);

  return (
    <div>
      <UserPlantsIndex plants={userPlants} />
      <UserPlantsNew onCreateUserPlant={handleCreateUserPlant} />
    </div>
  );
}
