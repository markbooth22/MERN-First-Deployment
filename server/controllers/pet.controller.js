const { request, response } = require("express");
const Pet = require("../models/pet.model");


module.exports = {
  getAll: (req, res) => {
    Pet.find()
      .sort("petType")
      .then((allPets) => res.json(allPets))
      .catch((err) => {
        console.log(`Error getting all pet documents: ${err}`)
        res.json(err)
      })
  },
  // create: (req, res) => {
  //   console.log(req.body);
  //   Pet.create(req.body)
  //     .then((newPetObject) => res.json(newPetObject))
  //     .catch((err) => {
  //       console.log(`Error creating all pet documents: ${err}`)
  //       res.json(err)
  //     })
  // },
  create: (req, res) => {
    console.log(req.body);
    Pet.exists({petName: req.body.petName})
    .then(petExists => {
      if (petExists) {
          return Promise.reject("Pet's Must have a unique name");
      }
      return Pet.create(req.body);
  })
  .then(saveResult => res.json(saveResult))
  .catch(err => res.json(err));
  },
  getOne: (req, res) => {
    Pet.findById(req.params.id)
      .then((onePet) => res.json(onePet))
      .catch((err) => {
        console.log(`Error getting a single pet documents: ${err}`)
        res.json(err)
      })
  },
  update: (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then((updatedPet) => res.json(updatedPet))
      .catch((err) => {
        console.log(`Error updating a single pet documents: ${err}`)
        res.json(err)
      })
  },
  delete: (req, res) => {
    Pet.findByIdAndDelete(req.params.id)
      .then((deleted) => res.json(deleted))
      .catch((err) => {
        console.log(`Error deleting a single pet documents: ${err}`)
        res.json(err)
      })
  },
}
