const axios = require("axios");

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/";

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/";

export const api = axios.create({
  baseURL: API_URL,
});

export const nextApi = axios.create({
  baseURL: NEXT_URL,
});
