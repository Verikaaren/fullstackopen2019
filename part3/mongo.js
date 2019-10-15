/* eslint-disable no-undef */
const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
// eslint-disable-next-line no-undef
const number = process.argv[4];

const url = `mongodb+srv://Bulgur_Ghost:${password}@cluster0-tlf7e.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	date: Date
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
	console.log('Phonebook');
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person.name, person.number);
		});
		mongoose.connection.close();
		process.exit(1);
	});
}

const person = new Person({
	name: name,
	number: number,
	date: new Date()
});

// eslint-disable-next-line no-unused-vars
person.save().then(response => {
	console.log(`Added ${person.name} to phonebook`);
	mongoose.connection.close();
});

/* Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
}); */
