require('dotenv').config();

const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new Schema({
	name: { type: String, required: true },
  	age: Number,
  	favoriteFoods: [String]
})


let Person = mongoose.model("Person", personSchema)


const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  })
};


var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, found) => {
	  if (err) return console.log(err)
	  done(null, found)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, found) => {
	  if (err) return console.log(err)
	  done(null, found)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, found) => {
	  if (err) return console.log(err)
	  done(null, found)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, (err, found) => {
	  if (err) return console.log(err)
	  found.favoriteFoods.push(foodToAdd)

	  found.save((err, data) => {
		  if (err) return console.log(err)
		  done(null, data)
	  })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updated) => {
	  if (err) return console.log(err)
	  done(null, updated)
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, found) => {
	  if (err) return console.log(err)
	  done(null, found)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = {
	  name: 'Mary'
  }
  Person.remove(nameToRemove, (err, resp) => {
    if (err) return console.log(err)
    done(null, JSON.Parse(JSON.stringify(resp)))
  })
}

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
