import React from "react";

// This file exports the Input, TextArea, and SearchBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="ff form-control" {...props} />
    </div>
  );
}

export function SearchBtn(props) {
  return (
    <button {...props}  className="btn btn-dark">
      {props.children}
    </button>
  );
}