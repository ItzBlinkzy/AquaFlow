import Layout from "./Layout";
import Navbar from "./Navbar";
import axios from "axios";
import { ContactData } from "../types";
import { useEffect, useState } from "react";
import { FiAlertCircle as AlertIcon } from "react-icons/fi";

const Help = () => {
  const [submitData, setSubmitData] = useState<ContactData>({
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmitContact = async () => {
    setError(false);

    const { email, subject, message } = submitData;

    if (
      !email.trim().length ||
      !subject.trim().length ||
      !message.trim().length
    ) {
      return setError(true);
    }

    const response = await axios.post("/api/contact", submitData);

    if (response.status === 200) {
      setSuccess(true);
      setSubmitData({ email: "", subject: "", message: "" });

      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setSubmitData({ ...submitData, [name]: value });
  };

  useEffect(() => {
    console.log(submitData);
  });

  return (
    <Layout>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-md rounded-md border-2 border-gray-300 bg-gray-200 px-4 py-3">
          {error && (
            <div className="my-2 flex flex-col items-center justify-center text-center">
              <div className="flex w-1/2 items-center gap-2 rounded-md bg-red-200 p-2 text-center font-bold text-red-700">
                <div>
                  <i>
                    <AlertIcon style={{ color: "red" }} size={24} />
                  </i>
                </div>
                Please fill out the entire form before submitting
              </div>
            </div>
          )}

          {success && (
            <div className="my-2 flex flex-col items-center justify-center text-center">
              <div className="flex w-1/2 items-center gap-2 rounded-md bg-green-200 p-2 text-center font-bold text-green-700">
                <div>
                  <i>
                    <AlertIcon style={{ color: "green" }} size={24} />
                  </i>
                </div>
                Successfully sent message to administrators.
              </div>
            </div>
          )}
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
            Having an issue with the AquaFlow website or service? Please don't
            hesitate to contact us by email!
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                className="dark:shadow-sm-light  block w-full rounded-lg border border-slate-300 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 "
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                onChange={handleInputChange}
                className="dark:shadow-sm-light block w-full rounded-lg border  border-slate-300 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                name="message"
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-slate-300 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handleSubmitContact}
              className="rounded-lg bg-primary-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-fit"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Help;
