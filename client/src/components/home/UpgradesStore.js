import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_UPGRADES } from "../utils/queries";
import { PURCHASE_UPGRADE } from "../utils/mutations";

const UpgradesStore = () => {
  const { loading, error, data, refetch } = useQuery(GET_UPGRADES);
  const [purchaseUpgrade] = useMutation(PURCHASE_UPGRADE);
  const [initialized, setInitialized] = useState(false);
  const [upgrades, setUpgrades] = useState();
  const handlePurchase = async (name) => {
    //Find index of the purchased upgrade
    const upgradedIndex = data.upgrades.findIndex(
      (upgrade) => upgrade.name === name
    );

    //Send api mutation to update database
    try {
      await purchaseUpgrade({
        variables: {
          name: data.upgrades[upgradedIndex].name,
        },
      });
      console.log(data.upgrades[upgradedIndex].name, "Upgrade Purchased");
    } catch (e) {
      console.error("Error Purchasing upgrade");
      console.error(e);
    }

    //refetch the updated upgrades data
    refetch();
  };

  if (loading) {
    return "Loading...";
  } else if (error) {
    return "ERROR!";
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
                onClick={() => handlePurchase(upgrade.name)}
              >
                <h3>{upgrade.name}</h3>
                <p>Flavor: {upgrade.flavor}</p>
              </button>
            </div>
          ) : null
        )}
      </div>
    );
  }
};

export default UpgradesStore;
