import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import App from "./App.tsx";
import BookingForm from "./components/Form/BookingForm";
import Pricing from "./components/Pricing";
import Help from "./components/Help";
import NotFound from "./components/NotFound";
import MyBookings from "./components/MyBookings";
import BookingCard from "./components/BookingCard.tsx";
import SignUp from "./components/User/SignUp.tsx";
import SignIn from "./components/User/SignIn.tsx";
import { StoreProvider } from "easy-peasy";
import store from "./components/store/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //{" "}
  // <React.StrictMode>
  <StoreProvider store={store}>
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-bookings/:id" element={<BookingCard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  </StoreProvider>,
  // </React.StrictMode>
);
