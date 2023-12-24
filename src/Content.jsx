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
import { NewCutting } from "./NewCutting";
import { Signup } from "./Signup";
import { FertilizerScheduleNew } from "./FertilizerScheduleNew";
import { Modal } from "./Modal";
import { UserPlantsShow } from "./UserPlantsShow";

export function Content() {
  const [userPlants, setUserPlants] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isPlantShowVisible, setIsPlantShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});

  const handleIndexUserPlants = () => {
    axios.get("http://localhost:3000/user_plants.json").then((response) => {
      setUserPlants(response.data);
    });
  };

  const handleCreateUserPlant = (params, successCallback) => {
    console.log("handleCreateUserPlant", params);
    axios
      .post("http://localhost:3000/user_plants.json", params)
      .then((response) => {
        setUserPlants([...userPlants, response.data]);
        successCallback();
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleUpdateUserPlant = (id, params) => {
    axios.patch(`http://localhost:3000/user_plants/${id}.json`, params).then((response) => {
      console.log(response);
      setUserPlants(
        userPlants.map((userPlant) => {
          if (userPlant.id === response.data.id) {
            return response.data;
          } else {
            return userPlant;
          }
        })
      );
    });
  };

  const handleDestroyUserPlant = (id) => {
    axios.delete(`http://localhost:3000/user_plants/${id}.json`).then((response) => {
      console.log(response);
      setUserPlants(userPlants.filter((recipe) => recipe.id !== id));
      handleHideUserPlant();
    });
  };

  const handleShowUserPlant = (plant) => {
    setIsPlantShowVisible(true);
    setCurrentPlant(plant);
    console.log(plant);
  };

  const handleHideUserPlant = () => {
    setIsPlantShowVisible(false);
  };

  useEffect(handleIndexUserPlants, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<UserPlantsNew toast={showToast} onCreateUserPlant={handleCreateUserPlant} />} />
        <Route path="/search" element={<PlantSearch />} />
        <Route path="/new_type" element={<NewType />} />
        <Route path="/new_zone" element={<NewZone />} />
        <Route path="/new_water" element={<NewWater />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new_cutting" element={<NewCutting />} />
        <Route path="/new_fertilizer" element={<FertilizerScheduleNew />} />

        {/* Corrected Route for UserPlantsIndex */}
        <Route
          path="/user_plants"
          element={<UserPlantsIndex plants={userPlants} onSelectUserPlant={handleShowUserPlant} />}
        />

        {/* Default Route */}
        <Route path="/" element={<UserPlantsIndex plants={userPlants} />} />
      </Routes>

      <Modal show={isPlantShowVisible} onClose={handleHideUserPlant}>
        <UserPlantsShow
          plant={currentPlant}
          onUpdatePlant={handleUpdateUserPlant}
          closeModal={handleHideUserPlant}
          onDestroyPlant={handleDestroyUserPlant}
        />
      </Modal>
    </div>
  );
}
