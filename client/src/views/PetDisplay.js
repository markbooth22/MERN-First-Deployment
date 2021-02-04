import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import { Button } from "../Utils/Utils";

const PetDisplay = (props) => {
  const [pet, setPet] = useState({});
  const {refresh, setRefresh} = props;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${props.id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => console.log("There was an error", err));
  }, []);

  const deletePet = (id) => {
    axios
      .delete(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        setRefresh(refresh + 1);
        console.log("Response: ", res);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div>
      <div className="header">
        <h1>Pet Shelter</h1>
        <Link to={`/`}>back to home</Link>
      </div>
      <div className="headerTwo">
        <h2>Details about: {pet.petName}</h2>
        <Button
          className="adoptButton"
          onClick={(e) => {
            deletePet(props.id);
          }}
        >
          <i class="fa fa-home"></i>
          <Link to="/">Adopt {pet.petName}</Link>
        </Button>
      </div>
      <div className="borderTwo">
        <h4 className="boldType">Pet's Type: </h4>
        <p className="type">{pet.petType}</p>
        <br></br>
        <h4 className="boldType">Pet's Description:</h4>
        <p className="description">{pet.petDescription}</p>
        <br></br>
        <h4 className="skillTitle">Pet's Skills:</h4>
        <div className="skillList">
          <p className="skill">{pet.petSkillOne}</p>
          <p className="skill">{pet.petSkillTwo}</p>
          <p className="skill">{pet.petSkillThree}</p>
        </div>
      </div>
    </div>
  );
};

export default PetDisplay;
