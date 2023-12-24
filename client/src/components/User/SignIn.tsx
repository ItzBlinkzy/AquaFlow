import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStoreState, useStoreActions, Actions, State } from "easy-peasy";
import { FiAlertCircle as AlertIcon } from "react-icons/fi";
import { StoreModel } from "../../types";
const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [registeredEmail] = useState(searchParams.get("email") || "");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const user = useStoreState((state: State<StoreModel>) => state.user);
  const setUser = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setUser,
  );
  useEffect(() => {
    // Logged in already
    if (user?.email) {
      navigate("/my-bookings");
    }
  });

  useEffect(() => {
    // Run once in the case that user registered previously and automatically set their email in the input.
    setEmail(registeredEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSignIn = async (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/users/sign-in", {
        email,
        password,
      });
      const { status, data } = response;
      // correct password and email
      if (status === 200) {
        setUser({
          ...user,
          email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        navigate("/my-bookings");
      }
    } catch (err: any) {
      const { data } = err.response;
      if (data.status === 400) {
        console.log("Malformed request.");
        setError(data.message);
      }
      if (data.status === 401) {
        console.log("Invalid user details.");
        setError(data.message);
      }

      if (data.status === 500) {
        console.log("Internal Server Errors");
        setError(data.message);
      }
    }
  };

  return (
    <div className="h-full w-full">
      <Navbar />

      <h1 className="m-10 text-center text-2xl font-bold">
        Sign in to view and book lessons.{" "}
      </h1>
      <div className="flex h-full w-full flex-col items-center">
        <div className="flex w-1/2 flex-col gap-7 lg:w-1/4">
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
              defaultValue={registeredEmail}
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
          <div className="flex flex-col justify-between">
            <button
              className="dark:focus-ring-primary-900 rounded-sm bg-primary-600 px-5 py-2.5 text-center font-medium text-white dark:text-white"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
          <div className="text-sm font-[500]">
            <div className="text-sm font-[500]">
              <p>
                Don't have an account yet?{" "}
                <a href="/sign-up" className="text-blue-500">
                  Create a new account
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {error?.length > 0 && (
              <div className="flex items-center gap-2 rounded-md bg-red-200 p-2 text-center font-bold text-red-700">
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

export default SignIn;
