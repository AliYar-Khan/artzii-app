import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
};

class AuthStore {
  authToken!: string | null;
  user!: User | {};
  navigation: any;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    this.authToken = await AsyncStorage.getItem("authToken");
    this.user =
      (await JSON.parse((await AsyncStorage.getItem("user")) || "{}")) || null;
  }

  async update(field: string, value: any) {
    if (field === "authToken") {
      await AsyncStorage.setItem(field, value);
      this.authToken = value;
    } else {
      await AsyncStorage.setItem(field, JSON.stringify(value));
      this.user = value;
    }
  }

  async clear() {
    await AsyncStorage.clear();
    this.authToken = null;
    this.user = {};
  }

  updateNavigation(value: any) {
    this.navigation = value;
  }
}

export default AuthStore;
