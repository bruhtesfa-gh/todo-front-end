import { createApi } from "@reduxjs/toolkit/query/react";
import baseApi from "./baseApi";
interface AuthRequest {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLazyMeQuery } =
  authApi;
