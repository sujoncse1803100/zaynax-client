import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vercel-node-express-deploy-test.vercel.app/api",
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
