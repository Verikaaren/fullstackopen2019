const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyParser = require("body-parser");

app.use(bodyParser.json());

morgan.token('person', function getPerson (request) {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content] - :response-time ms :person'));

let persons = [];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  var x = new Date();
  var myVar = x.toString();
  response.send(`<h4>Phonebook has info for ${persons.length + 1} people</h4><h4>${myVar} </h4> `)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id != id);

  response.send(` Person with ${id} was succsefully deleted`);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const person = request.body;
  if (!body) {
    return response.status(400).json({
      error: "content missing"
    });
  }
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "Insert number and name both"
    });
  }

  let check = false;
  persons.map(p => {
    if (p.name === person.name) {
      check = true;
    }
  });
  if (check === true) {
    return response.status(400).json({
      error: "This person already exist"
    });
  }

  person.id = Math.floor(Math.random() * 900000);

  persons.push(person);
  response.json(person);
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
