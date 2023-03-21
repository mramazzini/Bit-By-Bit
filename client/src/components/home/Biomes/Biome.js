import React from "react";

const Biome = ({ biome }) => {
  console.log(biome);
  return (
    <div className={biome.name}>{biome.farms.map((farm, index) => farm())}</div>
  );
};

export default Biome;
