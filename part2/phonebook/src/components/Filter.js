import React from "react";

const Filter = props => {
  return (
    <div>
      filter by name:{" "}
      <input value={props.newSearch} onChange={props.changeEvent} /> <br />
      <br />
      <br />
    </div>
  );
};

export default Filter;
