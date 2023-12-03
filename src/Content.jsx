import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { UserPlantsIndex } from "./UserPlantsIndex";
import { UserPlantsNew } from "./UserPlantsNew";
import { Route, Routes } from "react-router-dom";
import { PlantSearch } from "./PlantSearch";
import { NewType } from "./NewType";
import { NewZone } from "./NewZone";
import { NewWater } from "./NewWater";

export function Content() {
  const [userPlants, setUserPlants] = useState([]);

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
        <Route path="/search" element={<PlantSearch />} />
        <Route path="/new_type" element={<NewType />} />
        <Route path="/new_zone" element={<NewZone />} />
        <Route path="/new_water" element={<NewWater />} />
      </Routes>
    </div>
  );
}
