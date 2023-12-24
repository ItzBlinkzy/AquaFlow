import { useStoreState, State, useStoreActions, Actions } from "easy-peasy";
import { StoreModel } from "../../types";
const UserIcon = () => {
  const user = useStoreState((state: State<StoreModel>) => state.user);
  const userInitials = `${user!.firstName[0]}${user!.lastName[0]}`;
  const profileModal = useStoreState(
    (state: State<StoreModel>) => state.profileModal,
  );
  const setProfileModal = useStoreActions(
    (actions: Actions<StoreModel>) => actions.setProfileModal,
  );

  const handleIconClick = () => {
    console.log("ICON IS CLICKED MODAL SHOULD OPEN");
    setProfileModal(true);
    console.log(profileModal);
  };

  // Render your user icon or avatar here based on the `user` data
  return (
    <div>
      {user?.email ? (
        <a onClick={handleIconClick} className="cursor-pointer select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-300 text-center text-black">
            <span>{userInitials}</span>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default UserIcon;
