import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// import { BsSun as SunIcon, BsMoon as MoonIcon } from "react-icons/bs";
// import { useState } from "react";
// import useLocalStorage from "use-local-storage";
import { useStoreState, State } from "easy-peasy";
import { StoreModel } from "../types";
import UserIcon from "./User/UserIcon";
import SetCurrentUser from "../utils/SetCurrentUser";

const Navbar = () => {
  const user = useStoreState((state: State<StoreModel>) => state.user);
  const [profileIcon, setProfileIcon] = useState<boolean>(false);

  useEffect(() => {
    if (user?.email) {
      setProfileIcon(true);
    }
  }, [user]);
  return (
    <>
      <SetCurrentUser />
      <nav className="w-full dark:bg-gray-900">
        <div className="mx-auto flex flex-wrap items-center justify-between bg-white p-4">
          <a href="/" className="flex items-center">
            <img
              src="https://seeklogo.com/images/E/european-short-course-swimming-championship-logo-3332853D2F-seeklogo.com.png"
              className="mr-3 h-10"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              AquaFlow
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-3xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mr-2 mt-4 flex flex-col items-center rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-gray-900">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 underline decoration-blue-500 decoration-2 underline-offset-4"
                      : "deccoration-blue-500 decoration-blue-500 decoration-2 underline-offset-4 hover:underline hover:transition-all hover:ease-in-out"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/book"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 underline decoration-blue-500 decoration-2 underline-offset-4"
                      : "deccoration-blue-500 decoration-blue-500 decoration-2 underline-offset-4 hover:underline hover:transition-all hover:ease-in-out"
                  }
                >
                  Book Lessons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 underline decoration-blue-500 decoration-2 underline-offset-4"
                      : "deccoration-blue-500 decoration-blue-500 decoration-2 underline-offset-4 hover:underline hover:transition-all hover:ease-in-out"
                  }
                >
                  My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 underline decoration-blue-500 decoration-2 underline-offset-4"
                      : "deccoration-blue-500 decoration-blue-500 decoration-2 underline-offset-4 hover:underline hover:transition-all hover:ease-in-out"
                  }
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/help"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 underline decoration-blue-500 decoration-2 underline-offset-4"
                      : "deccoration-blue-500 decoration-blue-500 decoration-2 underline-offset-4 hover:underline hover:transition-all hover:ease-in-out"
                  }
                >
                  Help
                </NavLink>
              </li>
              <li
                className=":outline-none focus:ring-focus2 inline-flex cursor-pointer select-none items-center justify-center rounded-lg text-3xl text-black hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {}}
              ></li>
              {profileIcon && <UserIcon />}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
