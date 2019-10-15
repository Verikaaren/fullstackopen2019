require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Person = require('./models/person');

app.use(express.static('build'));

app.use(bodyParser.json());

morgan.token('person', function getPerson(request) {
	return JSON.stringify(request.body);
});

app.use(
	morgan(':method :url :status :res[content] - :response-time ms :person')
);

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons.map(person => person.toJSON()));
	});
});

/* app.get('/api/info', (request, response) => {
	var x = new Date();
	var myVar = x.toString();
 	response.send(
		`<h4>Phonebook has info for ${persons.length +
			1} people</h4><h4>${myVar} </h4> `
	); 
}); */

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id;
	Person.findById(id)
		.then(person => {
			if (person) {
				response.json(person.toJSON());
			} else {
				response.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body;

	const newPerson = {
		name: body.name,
		number: body.number
	};

	Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
		.then(updatedPerson => {
			console.log(newPerson, updatedPerson, request.params.id);
			response.json(updatedPerson.toJSON());
		})
		.catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
	const body = request.body;
	const person = request.body;
	if (!body) {
		return response.status(400).json({
			error: 'content missing'
		});
	}

	console.log(person);
	if (!person.name || !person.number) {
		return response.status(400).json({
			error: 'Insert number and name both'
		});
	}

	const newPerson = new Person({
		name: person.name,
		number: person.number
	});

	newPerson
		.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormattedPerson => {
			response.json(savedAndFormattedPerson);
		})
		.catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
