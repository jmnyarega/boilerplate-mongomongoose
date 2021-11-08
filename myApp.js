require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const schema = mongoose.Schema;

const personSchema = schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const data = { name: "Josiah", age: "56", favoriteFoods: ["cooked snakes"] };
  const person = new Person(data);

  person.save((err, data) => {
    if (err) done(err);
    else done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) done(err);
    else done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) done(err);
    else done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) done(err);
    else done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) done(err);
    else done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    else {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, data) => {
        if (err) done(err);
        else done(null, data);
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) done(err);
      else done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if (error) done(error);
    else done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, data) => {
    if (error) done(error);
    else done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const people = Person.find({ favoriteFoods: foodToSearch });
  people.sort();
  people.limit(2);
  people.select("-name");
  people.exec((error, data) => {
    if (error) done(error);
    else done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
