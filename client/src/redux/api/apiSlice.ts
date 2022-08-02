import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/user";

export const apiAuthSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000"}),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      Pick<User, "name" | "email">,
      Pick<User, "name" | "email" | "password">
    >({
      query: (userCredentials) => ({
        url: "auth/signup",
        method: "POST",
        body: userCredentials
      })
    }),
    login: builder.mutation<string, Pick<User, "name" | "email" | "password">>({
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: userCredentials
      })
    })
  })
});

export const { useLoginMutation, useSignUpMutation } = apiAuthSlice;
