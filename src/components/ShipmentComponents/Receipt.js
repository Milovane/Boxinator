import React from "react";
import "../../styles/shipment.css"

const Receipt = ({
  weightOption,
  boxColor,
  destinationCountry,
  destinationCountries,
  price,
}) => {
  const weightMap = {
    BASIC: 1,
    HUMBLE: 2,
    DELUXE: 5,
    PREMIUM: 8,
  };

  const selectedCountry = destinationCountries.find(
    (country) => country.id === destinationCountry
  );

  const weight = weightMap[weightOption];
  const flatFee = 200;
  const countryMultiplier = selectedCountry ? selectedCountry.countryMultiplier : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full h-48 mb-4 receiptCard" >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Receipt
      </h3>
      {selectedCountry && weightOption && (
        <>
          <p className="receiptText">
            Destination: {selectedCountry.name}
          </p>
          <p className="receiptText">
            Weight Option: {weightOption} ({weight})
          </p>
          <p className="receiptText">Box Color: {boxColor}</p>
          <p className="receiptText">
            Country Multiplier: {countryMultiplier}
          </p>
          <hr className="my-2" />
          <p className="receiptText">
          Total cost:
            <br />
            Flat Fee: {flatFee}
            <br />
            Weight * Multiplier: {weight} * {countryMultiplier} ={" "}
            {weight * countryMultiplier}
            <br />
            <br />
            <strong>
              Final Price: {flatFee + (weight * countryMultiplier)}
            </strong>
          </p>
        </>
      )}
    </div>
  );
};

export default Receipt;