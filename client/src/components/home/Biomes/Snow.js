import React from "react";
import Biome from "./Biome";
import "../../../styles/biomes/Snow.css";

const Snow = () => {
  const createHeader = (name) => {
    return <header className="upgrade-header">{name}</header>;
  };
  const snowPeck = () => {
    return (
      <div className="snow-biome-upgrade">{createHeader("Peck for Snow")}</div>
    );
  };

  const snowBall = () => {
    return (
      <div className="snow-biome-upgrade">{createHeader("Make Snowballs")}</div>
    );
  };
  const shovelSnow = () => {
    return (
      <div className="snow-biome-upgrade">{createHeader("Dig for Snow")}</div>
    );
  };

  return (
    <Biome biome={{ name: "snow", farms: [snowPeck, snowBall, shovelSnow] }} />
  );
};

export default Snow;
