import React from "react";
import axios from "axios";
import { FiAlertCircle as AlertIcon } from "react-icons/fi";

type ModalProps = {
  bookingId: string;
  showDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const DeleteModal = ({
  showDeleteModal,
  bookingId,
  setShowSuccessMessage,
}: ModalProps) => {
  const handleDeleteBooking = async (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      // Has to be a get request due to this error I'm encountering with vercel and axios.
      // RequestContentLengthMismatchError: Request body length does not match content-length header
      
      const { data } = await axios.get(`/api/bookings/delete/${bookingId}`, {
        withCredentials: true,
      });
      console.log(data);
      if (data?.success) {
        setShowSuccessMessage(true);
        showDeleteModal(false);
      }
    } catch (err) {
      showDeleteModal(false);
      setShowSuccessMessage(false);
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 text-white backdrop-blur-lg transition-all duration-1000 ease-in">
      <div className="min-w-1/2  rounded-md border-[1px] border-slate-300 bg-slate-100">
        <div className="flex h-full flex-col items-center justify-between gap-5 p-6">
          <i>
            <AlertIcon style={{ color: "red" }} size={48} />
          </i>
          <h2 className="items-center text-center text-2xl text-gray-500">
            Are you sure you want to delete this booking?
          </h2>
          <div className="flex justify-between gap-3">
            <button
              className="w-36 rounded-sm border border-slate-300 bg-white p-2 text-blue-700 hover:bg-slate-200"
              onClick={() => showDeleteModal(false)}
            >
              No, go back
            </button>
            <button
              className="w-36 rounded-sm bg-red-600 p-2"
              onClick={handleDeleteBooking}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
