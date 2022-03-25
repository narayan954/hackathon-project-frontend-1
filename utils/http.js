import axios from 'axios';

const apiCall = (token = '') => {
  const http = axios.create({
    baseURL: 'https://boiling-depths-77572.herokuapp.com/api',
    withCredentials: true,
    headers: {
      authentication: `Bearer ${token}`,
    },
  });
  return http;
};

export default apiCall;
