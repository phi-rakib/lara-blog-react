import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/lara-blog/public",
});

const requestHandler = (request) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/login";
  }
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

apiClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

apiClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default apiClient;
