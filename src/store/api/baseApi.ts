import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseApi = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (tokenFromLocalStorage) {
      headers.set("authorization", `Bearer ${tokenFromLocalStorage}`);
    }
    return headers;
  },
});

export default baseApi;
