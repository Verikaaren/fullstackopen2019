import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const rows = () =>
    props.persons.map(person => <Person deletePerson={() => props.deletePerson(person)} person={person} key={person.id} />);
  return (
    <div>
      <h2>Number</h2>
      {rows()}
    </div>
  );
};

export default Persons;
