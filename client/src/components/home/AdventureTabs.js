import React from "react";

const AdventureTabs = () => {
  const adventureStack = [
    "Snow",
    "Forest",
    "Mountain",
    "Ocean",
    "Desert",
    "City",
    "Jungle",
    "Volcano",
  ];

  return (
    <div className="adventure-tab">
      {adventureStack.map((region, index) => (
        <div className="adventure-tab-section">{region}</div>
      ))}
    </div>
  );
};
export default AdventureTabs;
