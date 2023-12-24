import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStoreState, State, useStoreActions, Actions } from "easy-peasy";
import { StoreModel } from "../types";
interface ProtectedProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const user = useStoreState((state: State<StoreModel>) => state.user);
  const setUser = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setUser,
  );

  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      const response = await axios.get("/api/users/authenticate");
      if (response.data.status === 200) {
        if (!user?.email) {
          setUser({
            ...user,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        }
        setAuthenticated(true);
      }
    } catch (err: any) {
      if (err.response.status === 401) {
        navigate("/sign-in");
      }
    }
  };

  useEffect(() => {
    console.log("This route requires authentication.");
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render the children if the user is authenticated
  return authenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
