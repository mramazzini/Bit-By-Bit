import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_UPGRADES } from "../utils/queries";
import { PURCHASE_UPGRADE, UPDATE_GAME } from "../utils/mutations";

const UpgradesStore = ({
  score,
  updateScore,
  updateClickMultiplier,
  unlockBiome,
}) => {
  const { loading, error, data, refetch } = useQuery(GET_UPGRADES);
  const [updateGame] = useMutation(UPDATE_GAME);
  const [purchaseUpgrade] = useMutation(PURCHASE_UPGRADE);
  const [initialized, setInitialized] = useState(false);
  const [upgrades, setUpgrades] = useState();
  refetch();
  const handlePurchase = async (name, price, index) => {
    const upgradeArray = data.upgrades;

    //Find index of the purchased upgrade
    const upgradedIndex = upgradeArray.findIndex(
      (upgrade) => upgrade.name === name
    );

    const purchasedUpgrade = upgradeArray[upgradedIndex];

    //Send api mutation to update database
    try {
      //Update score in database
      await updateGame({
        variables: {
          score: score,
        },
      });

      const upgradeResponse = await purchaseUpgrade({
        variables: {
          name: purchasedUpgrade.name,
          score: score,
        },
      });

      if (!upgradeResponse) {
        throw new Error("Purchase failed");
      } else if (upgradeResponse.data.purchaseUpgrade === "purchased") {
        console.log(purchasedUpgrade.name, "Upgrade Purchased");
        //Update score in state
        updateScore(score - price);
        //Remove the div with the clicked key index
        setUpgrades((prevUpgrades) => {
          const newUpgrades = [...prevUpgrades];
          newUpgrades.splice(index, 1);
          return newUpgrades;
        });
        //Update click multiplier in state

        if (purchasedUpgrade.effect.includes("click_multiplier")) {
          updateClickMultiplier(
            parseInt(purchasedUpgrade.effect.substring(17))
          );
        } else if (purchasedUpgrade.effect.includes("biome_unlock")) {
          //Unlock biome
          console.log(purchasedUpgrade.effect.substring(13));
          unlockBiome(purchasedUpgrade.effect.substring(13));
        }
      } else {
        console.log(
          data.upgrades[upgradedIndex].name,
          "Cant afford upgrade/Error purchasing"
        );
      }
    } catch (e) {
      console.error("Error Purchasing upgrade");
      console.error(e);
    }
  };

  if (loading) {
    return "Loading...";
  } else if (error) {
    return "Error, try refreshing the page";
  } else if (!initialized) {
    setInitialized(true);
    setUpgrades(data.upgrades);
  } else {
    return (
      <div className="upgrades-store">
        {data.upgrades.map((upgrade, index) =>
          upgrade.status === "shown" ? (
            <div key={index}>
              <button
                className="store-item"
                onClick={() =>
                  handlePurchase(upgrade.name, upgrade.price, index)
                }
              >
                <h3>{upgrade.name}</h3>
                <p>{upgrade.description}</p>
                <p> {upgrade.flavor}</p>
                <p>Cost: {upgrade.price}</p>
              </button>
            </div>
          ) : null
        )}
      </div>
    );
  }
};

export default UpgradesStore;
