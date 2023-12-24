import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative grid min-h-[calc(100vh-72px)] grid-rows-1 overflow-hidden bg-heroColor md:grid md:grid-cols-2">
      <section className="flex flex-col items-center justify-center gap-5 bg-heroColor bg-gradient-to-r from-[#6a8dec] via-[#7bcaff] via-95% to-[#7bcaff]">
        <div className="shape-divider hidden lg:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2.17 35.28"
            preserveAspectRatio="none"
          >
            <path
              d="M.5 35.28C1.04 32.2.07 26 .5 19.13.9 12.26 1.06 5.4.38 0H0v35.28z"
              className="fill-heroColor"
            />
            <path
              d="M1 35.28c.8-3.17-.38-7.3-.55-10.04-.17-2.76 1.47-9.25 1.3-12.68C1.58 9.14.91 7.92.88 5.52.86 3.12 1.76 0 1.76 0H0v35.28z"
              opacity=".7"
              className="fill-heroColor"
            />
            <path
              d="M1.85 35.28c-.83-2.57-.3-7.68-.42-11.8-.12-4.1-.61-6.85-.28-9.57.33-2.73 1.17-5.61 1-8.61-.19-3-.82-4.73-.84-5.3H.1v35.28z"
              opacity=".3"
              className="fill-heroColor"
            />
          </svg>
        </div>
        <h1 className="max-w-screen-xl text-center text-sm font-extrabold md:text-6xl lg:text-8xl">
          Learn how to swim with us!
        </h1>
        <span className="bold flex w-full max-w-screen-xl flex-col gap-10 break-normal p-4 text-center text-sm italic md:text-2xl lg:text-4xl">
          Dive into the World of Swimming Excellence with AquaFlow
        </span>
        <div>
          <button
            type="button"
            className="background m-0 inline-flex items-center rounded-sm bg-primary-600 px-6 py-5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary-600 dark:focus:ring-blue-800 md:text-2xl lg:text-4xl"
            onClick={() => navigate("/book")}
          >
            Book Lessons
          </button>
        </div>
      </section>
      <section>
        <img src="/cover.jpg" className="h-full object-cover"></img>
      </section>
    </div>
  );
};

export default Hero;
