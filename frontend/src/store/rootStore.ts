import React from "react";
import AuthStore from "./authStore";

export default class RootStore {
  authStore: any;
  constructor() {
    this.authStore = new AuthStore();
  }
}

const RootStoreContext = React.createContext(new RootStore());

// custom hooks available for the app to connect to the stores
export const useStores = () => React.useContext(RootStoreContext);
