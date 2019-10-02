import React, { useState } from "react";


import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      id: 1
    },
    {
      name: "Eveliala",
      id: 2
    },
    {
      name: "Andrei",
      id: 4
    },
    {
      name: "Esko Kauskas",
      id: 3
    }
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  

  const handlePersonChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handlePersonSearch = event => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
    let found = persons.filter(person => person.name.includes(newSearch));
    setPersons(found);
console.log(found);
  };

  const addPerson = event => {
    event.preventDefault();
    let check = false;

    persons.map(person => {
      if (person.name === newName) {
        check = true;
      }
    });

    if (check === true) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 2
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <div>
          
          
        <Filter value={newSearch} changeEvent={handlePersonSearch} />

        <PersonForm
          nameValue={newName}
          nameChange={handlePersonChange}
          numberValue={newNumber}
          numberChange={handleNumberChange}
          submitEvent={addPerson}
        />

        
      </div>
      

      <Persons persons={persons} />
    </div>
  );
};

export default App;
