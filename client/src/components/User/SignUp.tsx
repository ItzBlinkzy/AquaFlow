import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStoreState, State } from "easy-peasy";
import { StoreModel } from "../../types";
import { FiAlertCircle as AlertIcon } from "react-icons/fi";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const user = useStoreState((state: State<StoreModel>) => state.user);

  useEffect(() => {
    if (user?.email) {
      navigate("/my-bookings");
    }
  });

  const handleFirstNameChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const val = target.value;

    setFirstName(val);
  };

  const handleLastNameChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const val = target.value;

    setLastName(val);
  };

  const handleEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const val = target.value;

    setEmail(val);
  };

  const handlePassChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const val = target.value;

    setPassword(val);
  };

  const handleSignUp = async (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/users/sign-up", {
        firstName,
        lastName,
        email,
        password,
      });
      const { status, data } = response;
      // successful regristration, jwt given.
      if (status === 201) {
        setEmail(data.email);
        navigate(`/sign-in?email=${data.email}`);
      }
    } catch (err: any) {
      const { status, data } = err.response;
      if (status === 400) {
        console.log("Invalid SERVER ERROR");
        setError(data.message);
      }
      if (status === 500) {
        console.log("INTERNAL SERVER ERROR");
        setError(data.message);
      }
    }
  };

  return (
    <div className="h-full w-full">
      <Navbar />
      <h1 className="m-10 text-center text-2xl font-bold">
        Create a new account with AquaFlow{" "}
      </h1>

      <div className="flex h-full w-full flex-col items-center">
        <div className="md:1/2 flex flex-col gap-7 lg:w-1/3">
          <div className="flex flex-row justify-between gap-5">
            <div className="flex w-1/2 flex-col">
              <label
                htmlFor="fname"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={handleFirstNameChange}
                className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="First Name"
                required={true}
              />
            </div>
            <div className="flex w-1/2 flex-col">
              <label
                htmlFor="lname"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                onChange={handleLastNameChange}
                className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Last Name"
                required={true}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-gray-900 outline-slate-400"
              type="email"
              name="email"
              id="email"
              onChange={handleEmailChange}
              placeholder="Enter email"
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-gray-900 outline-slate-400"
              type="password"
              name="password"
              id="password"
              onChange={handlePassChange}
              placeholder="••••••••"
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <button
              className="dark:focus-ring-primary-900 rounded-sm bg-primary-600 px-5 py-2.5 text-center font-medium text-white dark:text-white"
              onClick={handleSignUp}
              type="submit"
            >
              Create a new account
            </button>
          </div>
          <div className="text-sm font-[500]">
            <div className="text-sm font-[500]">
              <p>
                Already have an account?{" "}
                <a href="/sign-in" className="text-blue-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {error?.length > 0 && (
              <div className="flex w-1/2 items-center gap-2 rounded-md bg-red-200 p-2 text-center font-bold text-red-700">
                <div>
                  <i>
                    <AlertIcon style={{ color: "red" }} size={24} />
                  </i>
                </div>
                <div>{error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
