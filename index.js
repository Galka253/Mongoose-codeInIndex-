/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");
const Person = require("./person");
mongoose.connect("mongodb://localhost:27017/person", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Create a person with this prototype:
const Schema = mongoose.Schema;

//Create the user Schema

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: {
    type: [String],
    required: true,
  },
});
const Person = mongoose.model("Person", personSchema);

/** 3) Create and Save a Person */
const createAndSavePerson = (done) => {
  var kefiSeif = new Person({
    name: "Kefi Seif",
    age: 26,
    favoriteFoods: ["Bananas", "Sushi", "Pates"],
  });
  kefiSeif.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};
//Create Many Records with model.create()
const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

//Use model.find() to Search Your Database
await Person.find({ name: "Kefi Seif" }).exec();

//Use model.findOne() to Return a Single Matching Document from Your Database

await Person.findOne({ favoriteFoods: ["Bananas", "Sushi"] }).exec();

//Use model.findById() to Search Your Database By _id
await Adventure.findById(_id).exec();

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = function (personId, done) {
  console.log(personId);
  let foodToAdd = "hamburger";
  Person.findById({ _id: personId }, async (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    await data.save();
    done(null, data);
  });
};
//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  var ageToSet = 20;
  const person = Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) {
        return done(err);
      } else {
        return done(null, data);
      }
    }
  );
};
//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  const person = Person.findByIdAndRemove(
    { _id: personId },
    function (err, data) {
      if (err) {
        return done(err);
      } else {
        return done(null, data);
      }
    }
  );
};
//MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  var nameToRemove = "Mary";
  const person = Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};
// Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) => {
  var foodToSearch = "burrito";
  const people = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
};
