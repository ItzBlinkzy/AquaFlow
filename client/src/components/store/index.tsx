import { action, createStore } from "easy-peasy";
import { StoreModel } from "../../types";
const store = createStore<StoreModel>({
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  profileModal: false,
  setProfileModal: action((state, payload) => {
    state.profileModal = payload;
  }),
});

export default store;
