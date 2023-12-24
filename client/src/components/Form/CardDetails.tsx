import { useState } from "react";

const CardDetails = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const handleCardChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const cardVal = target.value;

    const cardNumberWithoutSpaces = cardVal.replace(/\D/g, "");
    const formattedCardNumber = cardNumberWithoutSpaces
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const inputVal = target.value;

    let formattedExpiryDate = inputVal.replace(/[^0-9/]/g, "");

    if (/^\d{2}$/.test(formattedExpiryDate)) {
      formattedExpiryDate = formattedExpiryDate + "/";
    }

    if (formattedExpiryDate.length > 5) {
      formattedExpiryDate = formattedExpiryDate.slice(0, 5);
    }

    setExpiryDate(formattedExpiryDate);
  };
  return (
    <>
      <div className="mb-2 mt-10 flex items-center text-sm font-semibold text-gray-500">
        <p className="italic">
          Please do not enter real card details — this is for display purposes
          only.
        </p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="ccn"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Card Number
        </label>
        <input
          type="tel"
          id="ccn"
          inputMode="numeric"
          pattern="[0-9]{13,19}"
          title="Invalid Credit Card"
          autoComplete="cc-number"
          onChange={handleCardChange}
          value={cardNumber}
          maxLength={19}
          className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1234 5678 1234 5678"
          required
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <div className="mb-6 w-[50%]">
          <label
            htmlFor="cvv"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            CVV
          </label>
          <input
            type="tel"
            id="password"
            placeholder="123"
            pattern="[0-9]{3}"
            maxLength={3}
            className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6 w-[50%]">
          <label
            htmlFor="expiry-date"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Expiry Date
          </label>
          <input
            type="text"
            id="expiry-date"
            placeholder="MM/YY"
            pattern="^[0-9]{2}\/[0-9]{2}$"
            title="Format MM/YY"
            autoComplete="off" // Disable autocomplete to prevent browser suggestions
            onChange={handleExpiryDateChange}
            value={expiryDate}
            maxLength={5}
            className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </>
  );
};

export default CardDetails;
