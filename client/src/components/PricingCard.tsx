import React from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "../types";

interface PricingProps {
  packages: Package[];
}

const PricingCard: React.FC<PricingProps> = ({ packages }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="mx-auto mb-8 max-w-screen-md lg:mb-12">
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            AquaFlow Membership Pricing
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at AquaFlow, we offer three different packages to cater to
            swimmers of all skill levels. Whether you're just starting or
            looking to take your swimming skills to the next level, we have the
            perfect option for you.
          </p>
        </div>
        <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
          {packages.map(({ name, description, price, features }, index) => (
            <div
              key={index}
              className="mx-auto flex max-w-lg flex-col justify-between rounded-lg border border-gray-100 bg-slate-200 p-6 text-center text-gray-900 shadow outline outline-1 outline-slate-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8"
            >
              <h3 className="mb-4 text-2xl font-bold">{name}</h3>
              <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
                {description}
              </p>
              <div className="my-8 flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">{price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                onClick={() => navigate("/book")}
                className="dark:focus-ring-primary-900 rounded-sm bg-primary-600 px-5 py-2.5 text-center font-medium text-white  dark:text-white"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCard;
