const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petName: { 
    type: String,
    required: [true, "You need to enter a pet's name"],
    minlength: [3, "Pet's name must be at least three characters"],
    // unique: [true, "Pet's can not have the same name"]
  },
  petType: {
    type: String,
    required: [true, "You need to enter the pet's type"],
    minlength: [3, "Pet's type must be at least three characters"]
  },
  petDescription: { 
    type: String,
    required: [true, "You need to describe the pet"],
    minlength: [3, "Pet's description must be at least three characters"]
  }, 
  petSkillOne: { 
    type: String,
    required: [false, "Choose up to 3 skills!"],
    
  },
  petSkillTwo: { 
    type: String,
    required: [false, "Choose up to 3 skills!"],
    
  },
  petSkillThree: { 
    type: String,
    required: [false, "Choose up to 3 skills!"],
    
  }

}, {timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);