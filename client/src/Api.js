import axios from "axios";

const api = axios.create({
  baseURL: 'url',
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
});

export default api;