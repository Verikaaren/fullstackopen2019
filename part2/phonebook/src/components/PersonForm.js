import React from "react";

const PersonForm = (props) => { 
  console.log(props)

  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handlePersonChange} />
        <br />
        number:
        <input value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
