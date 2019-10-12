import React from "react";

// Exporting the Container, Row, and Col components from this file
const style={
    borderStyle:{
    borderStyle: "solid",
    borderColor: "#17a2b8",
    height:250,
    paddingRight:20,
    paddingLeft:20,
    paddingTop:20,
    marginBottom:20,
    },
    
    borderStyleOne:{
        borderStyle: "solid",
        borderColor: "#17a2b8",
        paddingRight:20,
        paddingLeft:20,
        paddingTop:20,
        marginBottom:100,
    }

}
// This Container component allows us to use a bootstrap container without worrying about class names
export function Container({ fluid, children }) {
  return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

export function Box ({children}){
    return <div style={style.borderStyle}>
    
    {children}</div>
}

export function BoxOne ({children}){
    return <div style={style.borderStyleOne}>
    
    {children}</div>
}
// This Row component lets us use a bootstrap row without having to think about class names
export function Row({ fluid, children }) {
  return <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>;
}

// This Col component lets us size bootstrap columns with less syntax
// e.g. <Col size="md-12"> instead of <div className="col-md-12">
export function Col({ size, children }) {
  return (
    <div
      className={size
        .split(" ")
        .map(size => "col-" + size)
        .join(" ")}
    >
      {children}
    </div>
  );
} 