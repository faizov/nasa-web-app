import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apodApi = createApi({
  reducerPath: "apodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.nasa.gov/planetary`,
  }),
  endpoints: (builder) => ({
    getApod: builder.query({
      query: () => `/apod?api_key=${import.meta.env.VITE_API}`,
    }),
    getApodRandom: builder.query({
      query: () => `/apod?api_key=${import.meta.env.VITE_API}&count=1`,
    }),
    getApodDate: builder.query({
      query: (date) => `/apod?api_key=${import.meta.env.VITE_API}&date=${date}`,
    }),
  }),
});

export const {
  useGetApodQuery,
  useLazyGetApodRandomQuery,
  useLazyGetApodDateQuery,
} = apodApi;
