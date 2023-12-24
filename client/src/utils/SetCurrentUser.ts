import { useEffect } from "react";
import { useStoreState, State, useStoreActions, Actions } from "easy-peasy";
import axios from "axios";
import { StoreModel } from "../types";

const SetCurrentUser = () => {
  const user = useStoreState((state: State<StoreModel>) => state.user);
  const setUser = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setUser
  );

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("/api/users/authenticate");
        if (response.data.status === 200 && !user?.email) {
          // If authenticated and not already set user, set the user data
          setUser({
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        }
      } catch (err) {
        // Returns an error or JWT expired.
        setUser(null);
      }
    };

    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SetCurrentUser;
