import React from "react";

const Biome = ({ biome, farms }) => {
  return (
    <div className="biome">
      <div className="biome-name">{biome.name}</div>
    </div>
  );
};

export default Biome;
