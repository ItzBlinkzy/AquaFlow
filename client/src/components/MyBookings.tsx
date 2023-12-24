import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserData } from "../types";
import ProtectedRoute from "./ProtectedRoute";
import { AiOutlinePlusCircle as PlusIcon } from "react-icons/ai";
import { FaSwimmer as SwimIcon } from "react-icons/fa";
import Layout from "./Layout";
import Navbar from "./Navbar";
import TimeAgo from "react-timeago";
import Fuse from "fuse.js";
import BookingSkeleton from "./BookingSkeleton";
const MyBookings = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingData, setBookingData] = useState<UserData[]>([]);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [fuse, setFuse] = useState<Fuse<UserData> | null>(null);

  const handleSearchChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const value = target.value;

    setSearchInput(value.trim());
  };

  const filterSearch = (input: string) => {
    if (!input || !fuse) {
      return bookingData; // Return all data if the search input is empty or fuse is not initialized yet
    }
    const results = fuse.search(input).map(({ item }) => item);
    return results;
  };

  useEffect(() => {
    console.log({ searchInput });
  }, [searchInput]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // adjusting larger load time, just to see the page skeleton and make page transitions smooth and seamless :)
        await new Promise((r) => setTimeout(r, 200));
        const response = await axios.get("/api/bookings");

        const sortedData = [...response.data].sort(
          (a, b) =>
            new Date(a.workshopDate).getTime() -
            new Date(b.workshopDate).getTime(),
        );
        setBookingData(sortedData);

        // fuse.js here
        const newFuse = new Fuse(sortedData, {
          keys: ["bookingId", "name", "workshopType"], // Adjust the keys you want to search
          includeScore: true,
          threshold: 0.3,
        });
        setFuse(newFuse as Fuse<UserData>);
        setHasFetchedData(true);
      } catch (err: any) {
        setError(true);
        console.error("Error fetching data:", err);
        setHasFetchedData(true);
      }
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only re-run the effect if bookingId changes

  return (
    <ProtectedRoute>
      <Layout>
        <Navbar />
        {error && (
          <div className="flex h-full items-center justify-center p-4 text-5xl font-extrabold">
            <span className="rounded-xl bg-red-400 p-5">
              There was an error retrieving your bookings.
            </span>
          </div>
        )}
        {bookingData.length == 0 && hasFetchedData && !error && (
          <div className="flex h-full w-full flex-col items-center gap-5 p-4">
            <h2 className="text-center text-2xl font-bold md:text-4xl">
              There are no current bookings made.
            </h2>
            <button
              onClick={() => navigate("/book")}
              className="dark:focus-ring-primary-900 rounded-sm bg-primary-600 px-5 py-2.5 text-center font-medium text-white dark:text-white"
            >
              Book a lesson
            </button>
          </div>
        )}
        {bookingData.length !== 0 && (
          <div>
            <div className="mx-auto p-2 md:w-1/2">
              <div className="flex items-end justify-between gap-3">
                <button
                  onClick={() => navigate("/book")}
                  className="dark:focus-ring-primary-900 rounded-3x flex items-center rounded-md bg-primary-600 p-2 text-center font-medium text-white hover:bg-blue-800 dark:text-white"
                >
                  <i className="mr-2 text-3xl">
                    <PlusIcon />
                  </i>
                  Book another lesson
                </button>
                <div>
                  <label
                    htmlFor="search"
                    className="flex w-full flex-col py-1 font-medium"
                  >
                    Search
                  </label>
                  <input
                    className="border-1 w-full rounded-md border border-slate-300 bg-slate-200 p-2 placeholder-slate-500 outline-none focus:border-slate-300 focus:bg-slate-300"
                    type="text"
                    id="search"
                    placeholder="ID, Name or Workshop"
                    autoComplete="off"
                    onChange={handleSearchChange}
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
            <div>
              {filterSearch(searchInput).length === 0 &&
                hasFetchedData &&
                !error && (
                  <div className="flex w-full items-center justify-center">
                    <div className="bold w-1/2 items-center justify-center rounded-md bg-slate-200 p-4 text-center text-3xl italic text-slate-800">
                      No results found
                    </div>
                  </div>
                )}
              {loading && <BookingSkeleton />}
              {filterSearch(searchInput).map(
                (
                  {
                    name,
                    bookingId,
                    workshopDate,
                    workshopType,
                    createdAt,
                    updatedAt,
                  },
                  index,
                ) => {
                  const workshopStarted =
                    new Date().getTime() > new Date(workshopDate).getTime();
                  const isUpdated = updatedAt > createdAt;
                  const dateToShow = isUpdated
                    ? new Date(updatedAt).toLocaleString()
                    : new Date(createdAt).toLocaleString();
                  const shouldHighlight = index === 0 && searchInput.length;
                  return (
                    <div key={bookingId} className="mx-auto p-2 md:w-1/2">
                      <div
                        className={`flex flex-col rounded-lg border p-4 lg:p-5 ${
                          shouldHighlight
                            ? "border-slate-500 bg-slate-300"
                            : "border-slate-300 bg-slate-200"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div className="flex flex-col justify-between gap-5 px-2">
                            <span
                              className={`text-3xl font-bold ${
                                shouldHighlight
                                  ? "text-slate-800"
                                  : "text-slate-600"
                              }`}
                            >
                              {name}
                            </span>
                            <div
                              className={`text-xl ${
                                shouldHighlight
                                  ? "text-slate-800"
                                  : "text-slate-600"
                              }`}
                            >
                              {workshopStarted ? (
                                <div className="flex items-end gap-2 font-medium text-red-500">
                                  <SwimIcon />
                                  <div>
                                    {workshopType} started{" "}
                                    <TimeAgo date={workshopDate} />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-end gap-2 font-bold text-green-600">
                                  <SwimIcon />
                                  <div>
                                    {workshopType} starting{" "}
                                    <TimeAgo date={workshopDate} />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          ID: {bookingId}
                        </div>
                        <div className="flex justify-between p-2">
                          <span className="flex items-center font-thin italic">
                            {updatedAt > createdAt
                              ? `Last modified at ${dateToShow}`
                              : `Created at ${dateToShow}`}
                          </span>
                          <button
                            type="button"
                            className={`h-9 w-28 rounded-sm px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-primary-600 ${
                              shouldHighlight ? "bg-primary-600" : "bg-blue-500"
                            }`}
                            onClick={() =>
                              navigate(`/my-bookings/${bookingId}`)
                            }
                          >
                            View Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default MyBookings;
