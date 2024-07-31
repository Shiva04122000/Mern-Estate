import axios from "axios";
import { baseUrl } from "./endPoints";

const accessToken = localStorage.getItem("access_token");

const publicRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const post = (endPoint, data) => {
  return publicRequest.post(endPoint, data);
};

export const put = (endPoint, id, data) => {
  return publicRequest.put(`${endPoint}/${id}`, data);
};

export const get = (endPoint) => {
  return publicRequest.get(endPoint);
};

export const deleteRequest = (endPoint, id) => {
  return publicRequest.delete(`${endPoint}/${id}`);
};
