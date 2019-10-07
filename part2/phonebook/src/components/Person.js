import React from "react";

const Person = (props) => {
  return (
    <div>
      <p>
        {props.person.name} {props.person.number} <span role="img" onClick={props.deletePerson} >❌ </span>
      </p>
      
    </div>
  );
};

export default Person;
