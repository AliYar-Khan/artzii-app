import React from "react";
import AuthStore from "./authStore";
import DesignStore from "./designStore";
export default class RootStore {
  authStore: any;
  designStore: any;
  constructor() {
    this.authStore = new AuthStore();
    this.authStore.init();
    this.designStore = new DesignStore();
    this.designStore.init();
  }

  async logout() {
    this.authStore.clear();
    this.designStore.clear();
  }
}

const RootStoreContext = React.createContext(new RootStore());

// custom hooks available for the app to connect to the stores
export const useStores = () => React.useContext(RootStoreContext);
