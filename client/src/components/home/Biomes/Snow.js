import React from "react";
import Biome from "./Biome";
import BiomeUpgrade from "./BiomeUpgrade";
const Snow = () => {
  const snowPeck = () => {
    const upgrade = {
      name: "Peck",
      description: "Peck at the snow to get some snowflakes",
      cost: 10,
    };
    return <BiomeUpgrade biome="snow" upgrade={upgrade}></BiomeUpgrade>;
  };

  const snowBall = () => {
    const upgrade = {
      name: "Snowballs",
      description: "Make some snowballs",
      cost: 10,
    };
    return <BiomeUpgrade biome="snow" upgrade={upgrade}></BiomeUpgrade>;
  };
  const shovelSnow = () => {
    const upgrade = {
      name: "Shovel Snow",
      description: "Perhaps a tool was a good idea",
      cost: 10,
    };
    return <BiomeUpgrade biome="snow" upgrade={upgrade}></BiomeUpgrade>;
  };

  return (
    <Biome biome={{ name: "snow", farms: [snowPeck, snowBall, shovelSnow] }} />
  );
};

export default Snow;
