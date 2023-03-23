import { useMutation } from "@apollo/client";
import React from "react";
import { CONVERT_CURRENCY } from "../../utils/mutations";

const CurrencyConverter = ({
  biome_currency,
  currency_amount,
  updateCurrencyAmount,
}) => {
  const [convertCurrency] = useMutation(CONVERT_CURRENCY);

  const updateScore = async () => {
    try {
      const response = await convertCurrency({
        variables: {
          name: biome_currency,
          currency_amount: currency_amount,
        },
      });
      const res = response.data.convertCurrency;
      if (!response) {
        throw new Error("Conversion Failed");
      } else if (res === "success") {
        console.log("Currency Converted");
        updateCurrencyAmount();
      } else if (res === "not enough currency") {
        console.log("Need more currency");
      } else {
        console.log("Something went wrong");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className="currency-converter-button" onClick={() => updateScore()}>
      Convert
    </button>
  );
};
export default CurrencyConverter;
