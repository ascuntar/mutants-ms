// Created By Eyder Ascuntar Rosales
const mongoose = require("mongoose");

const mutantSchema = new mongoose.Schema({
  dnaChain: {
    type: String,
    trim: true,
  },
  isMutant: {
    type: Boolean,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});
const Mutant = mongoose.model("Mutant", mutantSchema, "Mutant");
module.exports = Mutant;
