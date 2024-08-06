import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./endPoints";

const accessToken = localStorage.getItem("access_token");

const privateRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const requestHandler = (request) => {
  const accessToken = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "";
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
};

const responseErrorHandler = (error) => {
  if (error.response) {
    const { status, data, message } = error.response;
    switch (status) {
      case 500:
        window.location.href = "/";
        toast.warn("Token expired, please login");
        break;
      case 400:
        toast.error(
          data.message ? data.message : message || "Invalid Value/ Bad Request"
        );
        break;
      case 403:
        toast.error(
          data.message ? data.message : message || "Access Denied/ Forbidden"
        );
        break;
      case 404:
        toast.error(
          data.message ? data.message : message || "Item doesn't exist"
        );
        break;
      case 405:
        toast.error(data.message ? data.message : message || "Invalid Request");
        break;
      case 422:
        toast.error(data.message ? data.message : message || "Already Exists");
        break;
      case 504:
        toast.error(data.message ? data.message : message || "Network Error");
        break;
      default:
        break;
    }
  } else {
    toast.error(error?.message);
  }
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

privateRequest.interceptors.request.use(requestHandler, errorHandler);

privateRequest.interceptors.response.use(
  (response) => response,
  responseErrorHandler
);

export const privateGet = (endPoint) => {
  return privateRequest.get(endPoint);
};

export const privatePost = (endPoint, data, options) => {
  return privateRequest.post(endPoint, data, options);
};

export const privatePut = (endPoint, id, data, options) => {
  return privateRequest.put(`${endPoint}/${id}`, data, options);
};

export const privatePatch = (endPoint, id, data) => {
  return privateRequest.put(`${endPoint}/${id}`, data);
};

export const privateDelete = (endPoint, id) => {
  return privateRequest.delete(`${endPoint}/${id}`);
};

export default privateRequest;
