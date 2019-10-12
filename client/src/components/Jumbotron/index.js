import React from "react";

function Jumbotron({ children }) {


  return (
    <div
      style={{ backgroundImage: `url(https://images.squarespace-cdn.com/content/v1/5557cf3ee4b0d1d3fb23b342/1551750418686-RSNHXHOIZLGZWCFQW8D8/ke17ZwdGBToddI8pDm48kAUH2DD2GfLwvdkYNulJvdEUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dhliXwyeWgMjNPCxU3Oi1VQ0XXl85-NdjmUjFjz_lYwfZDqXZYzu2fuaodM4POSZ4w/IMG_4116.JPG?format=1000w)`,
      backgroundSize: "cover", height: 600, clear: "both", paddingTop: 220, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;