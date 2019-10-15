import React, { useState, useEffect } from 'react';

import personService from './services/persons';

import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
	useEffect(() => {
		personService.getAll().then(response => {
			setPersons(response.data);
		});
	}, []);

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');

	const [errorMessage, setErrorMessage] = useState({
		message: null,
		type: null
	});

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
	};

	const addPerson = event => {
		event.preventDefault();
		let check = false;
		let id = 0;

	

		if (check === true) {
			if (
				window.confirm(
					` ${newName} is already in phonebook, do you want to replace old number with new one?`
				)
			) {
				replaceNumber(id, newNumber);
			}
			setNewName('');
			setNewNumber('');
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 2
			};
			personService.create(personObject).then(response => {
				setPersons(persons.concat(response.data));
				setErrorMessage({
					message: `${newName} is added to Phonebook`,
					type: 'note'
				});
				setTimeout(() => {
					setErrorMessage({ ...errorMessage, message: null });
				}, 2000);
				setNewName('');
				setNewNumber('');
			});
		}
	};

	const deleteNumber = person => {
		console.log(person);
		if (window.confirm(`Do you really want to delete ${person.name}?`)) {
			personService
				.deleteIt(person.id)
				.then(response => {
					setPersons(persons.filter(p => p.id !== person.id));
					setErrorMessage({
						message: `${person.name} was deleted from server`,
						type: 'green'
					});
					setTimeout(() => {
						setErrorMessage({ ...errorMessage, message: null });
					}, 2000);
				})
				.catch(error => {
					setErrorMessage({
						message: `Information of${person.name} was already deleted from sever`,
						type: 'error'
					});
					setTimeout(() => {
						setErrorMessage({ ...errorMessage, message: null });
					}, 2000);
				});
		}
	};
	/**/
	const replaceNumber = (id, newNumber) => {
		const person = persons.find(p => p.id === id);
		const replacedNumber = { ...person, number: newNumber };

		personService
			.update(id, replacedNumber)
			.then(returnedPerson => {
				setPersons(
					persons.map(person =>
						person.id !== id ? person : returnedPerson.data
					)
				);
			})
			.catch(error => {
				console.log(error);
				setPersons(persons.filter(n => n.id !== id));
			});
	};

	return (
		<div>
			<h1>Phonebook</h1>

			<Notification state={errorMessage} />

			<Filter filterValue={newSearch} changeEvent={handlePersonSearch} />

			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handlePersonChange} />
					<br />
					number:
					<input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<Persons persons={persons} deletePerson={deleteNumber} />
		</div>
	);
};

export default App;
