import axios from "axios";
import { baseUrl } from "./endPoints";

const publicRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: "Bearer token",
  },
});

export const post = (endPoint, data) => {
  return publicRequest.post(endPoint, data);
};
