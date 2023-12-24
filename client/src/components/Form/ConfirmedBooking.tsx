import { PiCheckCircleFill } from "react-icons/pi";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmedBooking = ({ bookingId }: { bookingId: string }) => {
  const navigate = useNavigate();

  const handleViewBooking = (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    navigate(`/my-bookings/${bookingId}`);
  };

  const handleModifyBooking = (): void => {
    navigate(`/my-bookings/${bookingId}?modify=true`);
  };
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="mx-4 my-8 w-full max-w-screen-sm rounded-sm bg-slate-200 p-4 outline outline-2 outline-slate-400">
        <div className="border-b-[1px] border-slate-300 py-4 text-center text-2xl font-bold md:text-3xl">
          <div className="flex items-center py-1">
            <i className="mr-2">
              <PiCheckCircleFill color="green" />
            </i>
            Booking Confirmed
          </div>
        </div>
        <div className="p-2 font-bold">
          <div className="mb-2">
            Booking Id: <span className="font-normal">{bookingId}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handleModifyBooking}
            >
              Modify Booking
            </button>
            <button
              type="button"
              className="rounded-sm bg-primary-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-primary-600 "
              onClick={handleViewBooking}
            >
              View Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedBooking;
