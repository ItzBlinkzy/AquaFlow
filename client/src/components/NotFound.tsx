import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex h-screen flex-col items-center justify-center text-7xl">
        <h1>404</h1>
        <div className="flex min-h-[25%] flex-col items-center justify-center text-center">
          <span>Sorry this page does not exist.</span>
        </div>
        <button
          type="button"
          className="rounded-lg bg-primary-600 px-5 py-2.5 text-4xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary-600 dark:focus:ring-blue-800"
          onClick={() => navigate("/")}
        >
          <p>Return Home</p>
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
