import React from "react";
export const sortPokemon = (p1, p2, input) => {
  const p1Index = p1.Name.toLowerCase(input).indexOf(input);
  const p2Index = p2.Name.toLowerCase(input).indexOf(input);
  if (p1Index === -1 && p2Index !== -1) return 1;
  if (p1Index !== -1 && p2Index === -1) return -1;
  if (p1Index !== -1 && p2Index !== -1) return 0;
};

export const nameHL = (name, input) => {
  const indexStart = name.toLowerCase(input).indexOf(input);
  if (indexStart > -1)
    return (
      <span className="hl">
        {name.substring(0, indexStart)}
        <b>{name.substring(indexStart, indexStart + input.length)}</b>
        {name.substring(indexStart + input.length)}
      </span>
    );
  return name;
};

export const filterPokemon = (pokemon, userInput) => {
  return (
    pokemon.Name.toLowerCase().includes(userInput) ||
    pokemon.Types.reduce((acc, newV) => {
      return acc || newV.toLowerCase().includes(userInput);
    }, false)
  );
};
