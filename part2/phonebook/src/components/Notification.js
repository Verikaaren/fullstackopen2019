import React from "react";

const Notification = ({ state }) => {
  const message = state.message;
  const type = state.type;

  if (state.message === null) {
    return null;
  }

  const baseStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "2px",
    padding: "10px",
    marginBottom: "10px"
  };

  let notificationStyle = null;

  if (type === "error") {
    notificationStyle = {...baseStyle, color: 'red'}
  } else {
    notificationStyle ={...baseStyle, color: 'green'}
  }

  return <div style={notificationStyle}>{message}{console.log(type)}</div>;
};

export default Notification;
