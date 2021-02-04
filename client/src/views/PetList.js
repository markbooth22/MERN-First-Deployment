import React from "react";
import { Link } from "@reach/router";



const PetList = (props) => {
  const { pets } = props;




  return (
    <div className="PetList">
      <div className="header">
        <h1>Pet Shelter</h1>
        <Link to={`/pet/add`}>add a pet to the shelter</Link>
      </div>
      <h2>These Pets Are looking for a good home</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        {pets.map((pet, idx) => {
          return (
            <tbody>
              <tr key={idx}>
                <td>{pet.petName}</td>
                <td>{pet.petType}</td>
                <td>
                  <Link to={`/pet/${pet._id}`}>Details</Link> |
                  <Link className="edit" to={`/${pet._id}/edit`}>Edit</Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default PetList;
