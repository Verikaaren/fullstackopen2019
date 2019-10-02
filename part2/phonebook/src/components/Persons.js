import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  const rows = () =>
    persons.map(person => <Person person={person} key={person.id} />);
  return (
    <div>
      <h2>Number</h2>
      {rows()}
    </div>
  );
};

export default Persons;
