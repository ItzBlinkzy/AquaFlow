import { useStoreState, State, useStoreActions, Actions } from "easy-peasy";
import { StoreModel } from "../../types";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle as AlertIcon } from "react-icons/fi";

const UserModal = () => {
  const navigate = useNavigate();
  const user = useStoreState((state: State<StoreModel>) => state.user);
  const setUser = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setUser,
  );
  const [signOutError, setSignOutError] = useState("");
  const profileModal = useStoreState(
    (state: State<StoreModel>) => state.profileModal,
  );

  const setProfileModal = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setProfileModal,
  );
  const closeProfileModal = (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setSignOutError("");
    setProfileModal(false);
  };

  const handleSignOut = async (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    try {
      await axios.get("/api/users/sign-out", {
        withCredentials: true,
      });
      navigate("/sign-in");
      setUser(null);
      setProfileModal(false);
    } catch (err: any) {
      const { response } = err;
      if (response.status === 500) {
        console.log(response.message);
        setSignOutError("Could not sign out, Internal server error.");
      }
    }
  };
  return (
    <>
      {profileModal && (
        <div className="z-1 fixed inset-0 flex items-center justify-center p-4 text-white backdrop-blur-md transition-all duration-1000 ease-in">
          <div className="min-w-1/2  rounded-md border-[1px] border-slate-300 bg-slate-100 p-6">
            <div className="flex h-full flex-col justify-between gap-5 text-gray-500">
              <h2 className="items-center text-2xl text-gray-500">
                Hello, {user?.firstName} {user?.lastName}!
              </h2>
              Email: {user?.email}
              <div className="flex justify-between gap-3">
                <div className="flex flex-col justify-between gap-5">
                  <div>
                    <span className="font-bold">
                      Would you like to sign out?
                    </span>
                  </div>
                  <div className="flex gap-5">
                    <button
                      className="w-36 rounded-sm border border-slate-300 bg-white p-2 text-blue-700 hover:bg-slate-200"
                      onClick={closeProfileModal}
                    >
                      No, go back
                    </button>
                    <button
                      className="w-36 rounded-sm bg-red-600 p-2 text-white"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {signOutError?.length > 0 && (
                  <div className="flex w-full items-center justify-center gap-2 rounded-md bg-red-200 p-2 text-center font-bold text-red-700">
                    <div>
                      <i>
                        <AlertIcon style={{ color: "red" }} size={24} />
                      </i>
                    </div>
                    <div>{signOutError}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
