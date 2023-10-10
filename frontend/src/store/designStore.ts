import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";

class DesignStore {
  designId!: string;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    this.designId = (await AsyncStorage.getItem("designId")) || "";
  }

  async clear() {
    await AsyncStorage.removeItem("designId");
    this.designId = "";
  }

  async updateDesignId(value: any) {
    this.designId = value;
    await AsyncStorage.setItem("designId", value);
  }
}

export default DesignStore;