import React from "react";

const Pokemon = ({ img, Name, Types = [], hlName }) => (
  <li>
    <img src={img} alt="" />
    <div className="info">
      <h1>{hlName || <span className="hl">{Name}</span>}</h1>
      {Types.map((type, index) => (
        <span className={`type ${type.toLowerCase()}`} key={index}>
          {type}
        </span>
      ))}
    </div>
  </li>
);

export default Pokemon;
