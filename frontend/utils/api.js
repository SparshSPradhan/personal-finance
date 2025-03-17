import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5008/transactions",
});

export default api;
