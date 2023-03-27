import React from "react";

const CurrencyConverter = ({ updateCurrencyAmount }) => {
  const updateScore = async () => {
    updateCurrencyAmount();
  };

  return (
    <button className="currency-converter-button" onClick={() => updateScore()}>
      Convert
    </button>
  );
};
export default CurrencyConverter;
