import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.sunrisesunset.io/json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
