import React, { useState, useEffect } from "react";
import { FormData, UserData } from "../types";
import axios from "axios";
type ModalProps = {
  showModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookingData: UserData;
};

const ModifyModal = ({ showModifyModal, bookingData }: ModalProps) => {
  // const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const originalWorkshopType = bookingData.workshopType;
  const [submitData, setSubmitData] = useState<FormData>({
    name: "",
    age: "",
    workshopDate: new Date(),
    workshopType: bookingData.workshopType,
  });

  const handleOptionChange = (event: any): void => {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLSelectElement;

    setSubmitData({ ...submitData, [name]: value });
  };

  const shouldButtonDisable = () => {
    if (
      submitData.name.length ||
      submitData.age.length ||
      submitData.workshopType !== originalWorkshopType
    ) {
      return false;
    }
    return true;
  };

  const modifyBooking = async () => {
    console.log("Modifying booking is running.");
    const response = await axios.post(
      `/api/bookings/update/${bookingData.bookingId}`,
      submitData,
      { withCredentials: true },
    );
    console.log("Status Code: ", { statusCode: response.status });
    if (response.status === 200) {
      showModifyModal(false);
      console.log(`Successfully updated bookingId: ${bookingData.bookingId}`);
    }
  };

  useEffect(() => {
    console.log(submitData);
  }, [submitData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 text-white backdrop-blur-lg transition-all duration-1000 ease-in">
      <div className="relative h-full w-full max-w-2xl p-4 md:h-auto">
        <div className="relative rounded-lg border border-slate-400 bg-slate-200 p-4 shadow dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Booking
            </h3>
            <button
              type="button"
              onClick={() => showModifyModal(false)}
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form action="#">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleOptionChange}
                  className="primary-600 dark:primary-500 block w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder={bookingData.name}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  onChange={handleOptionChange}
                  className="primary-600 dark:primary-500 block w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder={bookingData.age.toString()}
                />
              </div>
              <div>
                <label
                  htmlFor="workshop-type"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Workshop Type
                </label>
                <select
                  id="workshop-type"
                  name="workshopType"
                  className="primary-500 dark:primary-500 block w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  onChange={handleOptionChange}
                >
                  {["Beginner", "Intermediate", "Advanced", "Water Polo"].map(
                    (wShop) => {
                      if (bookingData.workshopType !== wShop) {
                        return <option value={wShop}>{wShop}</option>;
                      }
                      return (
                        <option value={wShop} disabled>
                          {wShop}
                        </option>
                      );
                    },
                  )}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={modifyBooking}
                className="primary-300 dark:primary-800 rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white  hover:bg-primary-800 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-400 dark:bg-primary-600 dark:hover:bg-primary-700"
                disabled={shouldButtonDisable()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyModal;
