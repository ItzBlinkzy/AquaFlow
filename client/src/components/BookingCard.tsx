import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { UserData } from "../types";
import TimeAgo from "react-timeago";
import {
  AiFillCheckCircle as CheckIcon,
  AiFillCloseCircle as CloseIcon,
} from "react-icons/ai";
import { AiOutlineClockCircle as ClockIcon } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import ModifyModal from "./ModifyModal";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

const BookingCard = () => {
  const params = useParams();
  const bookingId = params?.id || "";
  const [searchParams] = useSearchParams();
  const openModify = Boolean(searchParams.get("modify") || false);
  const [bookingData, setBookingData] = useState<UserData | null>(null);
  const [workshopCompleted, setWorkshopCompleted] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [setModifyModal, setShowModifyModal] = useState<boolean>(openModify);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean | null>(
    null,
  );

  const [clockColour, setClockColour] = useState("green");
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveBookingData = async () => {
      console.log("retrieveing data");
      const response = await axios.get(`/api/bookings/${bookingId}`);
      if (response.status !== 200) {
        console.log("NOT FOUND!");
        return navigate("/");
      }
      return response.data;
    };

    retrieveBookingData().then((d: UserData) => {
      console.log("RETRIEVING BOOKING DATA");
      const msDiff = new Date().valueOf() - new Date(d.workshopDate).valueOf();
      if (msDiff > 0) {
        setWorkshopCompleted(true);
        setClockColour("red");
      }
      setBookingData(d);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedRoute>
      <Layout>
        <Navbar />
        {showSuccessMessage && (
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-between rounded-sm border-2 border-slate-300 bg-slate-200 p-4">
              <i className="text-5xl text-green-500">
                <CheckIcon />
              </i>
              <span className="p-5 text-4xl font-bold text-slate-800">
                Your booking was successfully deleted!
              </span>
              <button
                className="w-36 rounded-sm border border-slate-300 bg-blue-600 p-2 text-white hover:bg-primary-600"
                onClick={() => navigate("/my-bookings")}
              >
                Return
              </button>
            </div>
          </div>
        )}
        {showSuccessMessage == false && (
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-between rounded-sm border-2 border-slate-300 bg-slate-200 p-4">
              <i className="text-5xl text-red-500">
                <CheckIcon />
              </i>
              <span className="p-5 text-3xl font-bold text-slate-800">
                There was an issue deleting your booking, please try again
                later.
              </span>
              <button
                className="w-36 rounded-sm border border-slate-300 bg-white p-2 text-blue-600 hover:bg-slate-300"
                onClick={() => {
                  setShowSuccessMessage(null);
                }}
              >
                Return
              </button>
            </div>
          </div>
        )}
        {bookingData !== null && showDeleteModal && (
          <DeleteModal
            bookingId={bookingId}
            showDeleteModal={setShowDeleteModal}
            setShowSuccessMessage={setShowSuccessMessage}
          />
        )}
        {bookingData !== null && setModifyModal && (
          <ModifyModal
            showModifyModal={setShowModifyModal}
            bookingData={bookingData}
          />
        )}
        {bookingData !== null && showSuccessMessage == null && (
          <div className="flex w-full items-center justify-center p-4">
            <div className="flex h-1/2 min-w-[50%] flex-col rounded-lg border border-slate-300 bg-slate-200 text-3xl">
              <span className="flex items-center justify-between gap-4 border-b-[1px] border-slate-300 p-4 text-slate-700">
                ID — {bookingId}
                <i
                  className="text-bold cursor-pointer p-1 text-4xl text-slate-700 hover:text-black"
                  onClick={() => navigate("/my-bookings")}
                >
                  <CloseIcon />
                </i>
              </span>

              <div className="flex h-full flex-col flex-wrap justify-between gap-5 p-5 text-base text-slate-700">
                <div className="flex justify-between text-lg">
                  <div className="flex flex-col justify-center gap-5">
                    <p className="text-2xl font-bold text-slate-700">
                      {bookingData.name}
                    </p>
                    <p>Age: {bookingData.age}</p>
                    <div className="flex items-center gap-2">
                      <i>
                        <ClockIcon style={{ color: clockColour }} />
                      </i>
                      <span>
                        {workshopCompleted ? (
                          <div className="text-red-500">
                            Started{" "}
                            <span
                              className={`font-bold italic`} // add dynamic green or red to this class when possible.
                            >
                              <TimeAgo date={bookingData.workshopDate} />
                            </span>
                          </div>
                        ) : (
                          <div className="text-black-600">
                            Starting{" "}
                            <span
                              className={`font-bold italic`} // add dynamic green or red to this class when possible.
                            >
                              <TimeAgo date={bookingData.workshopDate} />
                            </span>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Workshop</p>
                    <p>{bookingData.workshopType}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  {!workshopCompleted && (
                    <button
                      type="button"
                      className="rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-blue-800 hover:bg-slate-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => setShowModifyModal(true)}
                    >
                      Modify Booking
                    </button>
                  )}
                  <button
                    type="button"
                    className="rounded-sm bg-red-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-900 dark:bg-blue-600 dark:hover:bg-red-700"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default BookingCard;
