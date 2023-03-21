import React from "react";
import Biome from "./Biome";

const Snow = () => {
  const snowPeck = () => {
    return <div>asd</div>;
  };

  return (
    <div className="snow">
      <Biome biome={{ name: "Snow" }} />
    </div>
  );
};

export default Snow;
