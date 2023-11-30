import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { UserPlantsIndex } from "./UserPlantsIndex";
import { UserPlantsNew } from "./UserPlantsNew";
import { Route, Routes } from "react-router-dom";

export function Content() {
  const [userPlants, setUserPlants] = useState([]);
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJleHAiOjE3MDEyNTg3NjF9.cNIMlVAtEuFUSgsoR1srco3QXsuFzKvaYHFHR9oMrbo`,
  // };
  const handleIndexUserPlants = () => {
    axios.get("http://localhost:3000/user_plants.json").then((response) => {
      console.log(response.data);
      setUserPlants(response.data);
    });
  };

  const handleCreateUserPlant = (params, successCallback) => {
    console.log("handleCreateUserPlant", params);
    axios.post("http://localhost:3000/user_plants.json", params).then((response) => {
      setUserPlants([...userPlants, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndexUserPlants, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserPlantsIndex plants={userPlants} />} />
        <Route path="/new" element={<UserPlantsNew onCreateUserPlant={handleCreateUserPlant} />} />
      </Routes>
    </div>
  );
}
