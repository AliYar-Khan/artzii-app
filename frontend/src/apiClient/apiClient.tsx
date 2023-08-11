import axios from "axios";

console.log("====================================");
console.log(
  "process.env.REACT_APP_BACKEND_URL ----->>>>",
  process.env.REACT_APP_BACKEND_URL
);
console.log("====================================");

export const client = axios.create({
  baseURL: "/api",
});
