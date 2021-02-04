import React, { useState } from "react";
import axios from "axios";
import { InputGroup, Button } from "../Utils/Utils";
import { navigate, Link } from "@reach/router";

const PetAdd = (props) => {
  const { refresh, setRefresh } = props;
  const [errs, setErrs] = useState({});
  const [form, setForm] = useState({
    petName: { value: "", touched: false },
    petType: { value: "", touched: false },
    petDescription: { value: "", touched: false },
    petSkillOne: { value: "", touched: false },
    petSkillTwo: { value: "", touched: false },
    petSkillThree: { value: "", touched: false },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/pets", {
        petName: form.petName.value,
        petType: form.petType.value,
        petDescription: form.petDescription.value,
        petSkillOne: form.petSkillOne.value,
        petSkillTwo: form.petSkillTwo.value,
        petSkillThree: form.petSkillThree.value,
      })
      .then((res) => {
        console.log("remove");
        if (res.data.errors) {
          setErrs(res.data.errors);
        } else {
          setRefresh(refresh + 1);
          console.log("Response: ", res);
          setForm({
            petName: { value: "", touched: false },
            petType: { value: "", touched: false },
            petDescription: { value: "", touched: false },
            petSkillOne: { value: "", touched: false },
            petSkillTwo: { value: "", touched: false },
            petSkillThree: { value: "", touched: false },
          });
          navigate("/");
        }
      })
      .catch((err) => console.log("Error: ", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: { value: value, touched: true } });
  };

  const fieldValidation = (field) => {
    const { value, touched } = field;
    if (touched === true && value === "") {
      return "*This field can not be empty";
    } else if (touched === true && value.length <= 2) {
      return "*This field has to have at least three characters";
    } else if (touched === true && value.endsWith(" ")) {
      return "This field can not end with a space";
    } else if (touched === true && value.startsWith(" ")) {
      return "This field can not start with a space";
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Pet Shelter</h1>
        <Link to={`/`}>back to home</Link>
      </div>
      <h2>Know a pet needing a home?</h2>
      <div className="border">
        <form onSubmit={onSubmitHandler}>
          <div className="firstInput">
            <InputGroup
              label="Pet's Name: "
              value={form.petName.value}
              type="text"
              handleChange={handleChange}
              name="petName"
              errorMessage={fieldValidation(form.petName)}
            />
            {errs.petName ? (
              <span style={{ color: "red" }}>{errs.petName.message}</span>
            ) : null}

            <InputGroup
              label="Pet's Type: "
              value={form.petType.value}
              type="text"
              handleChange={handleChange}
              name="petType"
              errorMessage={fieldValidation(form.petType)}
            />
            {errs.petType ? (
              <span style={{ color: "red" }}>{errs.petType.message}</span>
            ) : null}
            <InputGroup
              label="Pet's Description: "
              value={form.petDescription.value}
              type="text"
              handleChange={handleChange}
              name="petDescription"
              errorMessage={fieldValidation(form.petDescription)}
            />
            {errs.petDescription ? (
              <span style={{ color: "red" }}>
                {errs.petDescription.message}
              </span>
            ) : null}
            <Button className="addPet" type="submit"><i className="fa fa-download"></i>Add Pet</Button>
          </div>
          <div className="secondInput">
            <p>Skills (Optional)</p>
            <InputGroup
              label="Pet's First Skill: "
              value={form.petSkillOne.value}
              type="text"
              handleChange={handleChange}
              name="petSkillOne"
            />
            {errs.petSkillOne ? (
              <span style={{ color: "red" }}>{errs.petSkillOne.message}</span>
            ) : null}

            <InputGroup
              label="Pet's Second Skill: "
              value={form.petSkillTwo.value}
              type="text"
              handleChange={handleChange}
              name="petSkillTwo"
            />
            {errs.petSkillTwo ? (
              <span style={{ color: "red" }}>{errs.petSkillTwo.message}</span>
            ) : null}
            <InputGroup
              label="Pet's Third Skill: "
              value={form.petSkillThree.value}
              type="text"
              handleChange={handleChange}
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
export default PetAdd;
