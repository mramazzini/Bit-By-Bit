import React from "react";
import { useMutation } from "@apollo/client";
import { PURCHASE_FARM_UPGRADE } from "../../utils/mutations";

const Farm = ({ biome, upgrade, score, updateScore }) => {
  const [purchaseFarmUpgrade] = useMutation(PURCHASE_FARM_UPGRADE);
  const upgradeFarm = async () => {
    try {
      const response = await purchaseFarmUpgrade({
        variables: {
          name: upgrade.name,
          score: score,
        },
      });
      if (!response) {
        throw new Error("Purchase failed");
      } else if (response.data.purchaseFarmUpgrade === "purchased") {
        console.log(upgrade.name, "Upgrade Purchased");
        updateScore(score - upgrade.cost);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={`theme-${biome} biome-upgrade`}>
      <header className="upgrade-header">{upgrade.formattedName}</header>
      <div className={`${biome}-upgrade-image upgrade-image`}></div>
      <div className="upgrade-body">
        <div className="upgrade-description">{upgrade.description}</div>
        <div className="upgrade-cost">Cost: {upgrade.cost}</div>
        <div className="upgrade-cost">Level: {upgrade.level}</div>
        <button className="upgrade-button" onClick={upgradeFarm}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default Farm;
