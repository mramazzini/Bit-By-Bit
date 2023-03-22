import { useMutation } from "@apollo/client";
import React from "react";
import { UPDATE_GAME } from "../../utils/mutations";

const CurrencyConverter = () => {
  const [updateGame] = useMutation(UPDATE_GAME);
  const updateScore = async (score) => {
    try {
      const response = await updateGame({
        variables: {
          score: score,
          type: "score",
        },
      });
      if (!response) {
        throw new Error("Conversion Failed");
      } else if (response.data.updateGame === "updated") {
        console.log("Currency Converted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <button className="currency-converter-button">Convert</button>;
};
export default CurrencyConverter;
