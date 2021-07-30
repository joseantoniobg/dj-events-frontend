const axios = require("axios");

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/";

export const api = axios.create({
  baseURL: API_URL,
});
