const mongoose = require("mongoose");
const { stringify } = require("querystring");

/** 2) Create a 'Person' Model */
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
