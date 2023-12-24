import { useEffect, useState } from "react";
import axios from "axios";
import CardDetails from "./CardDetails";
import Navbar from "../Navbar";
import { FormData } from "../../types";
import Datepicker from "tailwind-datepicker-react";
import ConfirmedBooking from "./ConfirmedBooking";
import { AiOutlineSend as SendIcon } from "react-icons/ai";
import ValidationError from "./ValidationError";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "../Layout";
import { useStoreState, State } from "easy-peasy";
import { StoreModel } from "../../types";

const options = {
  title: "Workshop Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date(),
  theme: {
    background: "",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "text-slate-400",
    input: "bg-slate-100 z-10",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
};

const BookingForm = () => {
  const checkValidation = (): boolean => {
    const { name, age, workshopType, workshopDate } = formData;
    const timeNow = new Date();

    if (!name.trim()) {
      setError("Please enter a name.");
      return false;
    }

    if (!/^\d+$/.test(age.toString())) {
      setError("Please set a correct age.");
      return false;
    }

    if (!workshopType.trim() || workshopType === "Select Workshop") {
      setError("Please choose your workshop type.");
      return false;
    }

    if (workshopDate <= timeNow) {
      setError(
        "Date and time has already passed. Please choose a later date and time",
      );
      return false;
    }

    return true;
  };

  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const profileModal = useStoreState(
    (state: State<StoreModel>) => state.profileModal,
  );

  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState<FormData | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState(formattedTime);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    workshopType: "",
    workshopDate: new Date(),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [error]);

  const handleFormChange = (
    event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setError("");
    const { name, value } = event.target as HTMLTextAreaElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateClose = (state: boolean) => {
    setShowDatePicker(state);
  };

  const handleDateChange = (selectedDate: Date) => {
    const datePart = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split("T")[0];
    const newWorkshopDateTime = new Date(datePart + "T" + selectedTime);
    setFormData({ ...formData, workshopDate: newWorkshopDateTime });
  };

  const handleOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setFormData({ ...formData, workshopType: event.target.value }); // Update the selected option in state
  };

  const handleTimeChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { workshopDate } = formData;

    const target = event.target as HTMLInputElement;
    const timeVal = target.value;

    const datePart = workshopDate.toISOString().split("T")[0];

    const newWorkshopDateTime = new Date(datePart + "T" + timeVal);

    setFormData({
      ...formData,
      workshopDate: newWorkshopDateTime,
    });
    setSelectedTime(timeVal);
    // console.log({ newWorkshopDateTime });
    // console.log({ formData });
  };
  useEffect(() => {
    // This code will run after the state update is applied
    console.log(formData);
    console.log("formData.workshopDate:", formData.workshopDate);
  }, [formData]);

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLButtonElement>,
  ) => {
    setError("");
    event.preventDefault();
    console.log("Sending form data now.");

    try {
      const isValid = checkValidation();
      if (isValid) {
        console.log({ formData });
        // send to backend
        const { data } = await axios.post("/api/bookings/create", formData, {
          withCredentials: true,
        });

        // Reset the error state after a successful submission
        setError("");

        // Set bookingData with bookingId from the response data
        console.log("Received backend data to client -> ", { data });
        setBookingData({
          ...formData,
          bookingId: data.userData.bookingId,
        });
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Navbar />
        {bookingData !== null ? (
          <ConfirmedBooking bookingId={bookingData.bookingId || ""} />
        ) : (
          <section className="w-full bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl rounded-xl border-2 border-slate-300 bg-slate-200 px-6 py-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Book a swimming workshop.
              </h2>
              {error && <ValidationError message={error} setError={setError} />}
              <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleFormChange}
                      className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Enter full name"
                      required={true}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="age"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter age"
                      onChange={handleFormChange}
                      className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      title="hello"
                      min={5}
                      required={true}
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
                      className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      onChange={handleOptionChange}
                    >
                      <option defaultValue="true">Select Workshop</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Water Polo">Water Polo</option>
                    </select>
                  </div>
                  <div className={`${profileModal ? "z-[-1]" : ""}`}>
                    <label
                      htmlFor="workshop-date"
                      className="mb-2 block text-sm font-medium text-gray-900 hover:cursor-pointer dark:text-white"
                    >
                      Workshop Date
                    </label>
                    <Datepicker
                      options={options}
                      show={showDatePicker}
                      onChange={handleDateChange}
                      setShow={handleDateClose}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="workshop-time"
                      className="mb-2 block text-sm font-medium text-gray-900 hover:cursor-pointer dark:text-white"
                    >
                      Workshop Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={selectedTime}
                      className="h-full rounded-md border border-slate-300 bg-slate-100 p-1"
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>

                <CardDetails />
                <button
                  className="mt-4 inline-flex items-center rounded-lg bg-primary-700 p-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                  type="button"
                  onClick={handleFormSubmit}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span>Complete booking</span>
                    <i>
                      <SendIcon size={20} />
                    </i>
                  </div>
                </button>
              </form>
            </div>
          </section>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default BookingForm;
