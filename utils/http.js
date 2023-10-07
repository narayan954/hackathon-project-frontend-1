import axios from "axios";

const apiCall = (token = "") => {
  const http = axios.create({
    baseURL: "https://boiling-depths-77572.herokuapp.com/api",
    // baseURL: 'http://localhost:5000/api',
    headers: {
      authentication: token ? `Bearer ${token}` : "",
    },
  });
  return http;
};

export default apiCall;
