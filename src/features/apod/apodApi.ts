import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const apodApi = createApi({
  reducerPath: "apodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API}&count=1`,
  }),
  endpoints: (builder) => ({
    getApod: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useGetApodQuery } = apodApi;
