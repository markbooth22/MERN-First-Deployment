import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { Button, InputGroup } from "../Utils/Utils";


const PetEdit = (props) => {
  const [pet, setPet] = useState({});
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [petSkillOne, setPetSkillOne] = useState("");
  const [petSkillTwo, setPetSkillTwo] = useState("");
  const [petSkillThree, setPetSKillThree] = useState("");
  const [errs, setErrs] = useState({});
  const { refresh, setRefresh } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${props.id}`)
      .then((res) => {
        setPetName(res.data.petName);
        setPetType(res.data.petType);
        setPetDescription(res.data.petDescription);
        setPetSkillOne(res.data.petSkillOne);
        setPetSkillTwo(res.data.petSkillTwo);
        setPetSKillThree(res.data.petSkillThree);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${props.id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => console.log("There was an error", err));
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/pets/${props.id}`, {
        petName,
        petType,
        petDescription,
        petSkillOne,
        petSkillTwo,
        petSkillThree,
      })
      .then((res) => {
        if (res.data.errors) {
          setErrs(res.data.errors);
        } else {
          setRefresh(refresh + 1);
          console.log("Response: ", res);
          setPetName("");
          setPetType("");
          setPetDescription("");
          setPetSkillOne("");
          setPetSkillTwo("");
          setPetSKillThree("");
          navigate(`/pet/${props.id}`);
        }
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div className="PetEdit">
      <div className="header">
        <h1>Pet Shelter</h1>
        <Link to={`/`}>back to home</Link>
      </div>
      <h2>Edit {pet.petName}</h2>
      <div className="border">
        <form onSubmit={onSubmitHandler}>
          <div className="firstINput">
            <InputGroup
              label="Pet's Name: "
              value={petName}
              type="text"
              handleChange={(e) => setPetName(e.target.value)}
              name="petName"
            />
            {errs.petName ? (
              <span style={{ color: "red" }}>{errs.petName.message}</span>
            ) : null}
            <InputGroup
              label="Type of Pet: "
              value={petType}
              type="text"
              handleChange={(e) => setPetType(e.target.value)}
              name="petType"
            />
            {errs.petType ? (
              <span style={{ color: "red" }}>{errs.petType.message}</span>
            ) : null}
            <InputGroup
              label="Description of Pet: "
              value={petDescription}
              type="text"
              handleChange={(e) => setPetDescription(e.target.value)}
              name="petDescription"
            />
            {errs.petDescription ? (
              <span style={{ color: "red" }}>
                {errs.petDescription.message}
              </span>
            ) : null}
            <Button className="editButton" type="submit"><i className="fas fa-edit"></i>Edit Pet</Button>
          </div>
          <div className="secondInput">
            <p>Skills (Optional)</p>
            <InputGroup
              label="Pet's First Skill: "
              value={petSkillOne}
              type="text"
              handleChange={(e) => setPetSkillOne(e.target.value)}
              name="petSkillOne"
            />
            {errs.petSkillOne ? (
              <span style={{ color: "red" }}>{errs.petSkillOne.message}</span>
            ) : null}
            <InputGroup
              label="Pet's Second Skill: "
              value={petSkillTwo}
              type="text"
              handleChange={(e) => setPetSkillTwo(e.target.value)}
              name="petSkillTwo"
            />
            {errs.petSkillTwo ? (
              <span style={{ color: "red" }}>{errs.petSkillTwo.message}</span>
            ) : null}
            <InputGroup
              label="Pet's Third Skill: "
              value={petSkillThree}
              type="text"
              handleChange={(e) => setPetSKillThree(e.target.value)}
              name="petSkillThree"
            />
            {errs.petSkillThree ? (
              <span style={{ color: "red" }}>{errs.petSkillThree.message}</span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetEdit;
