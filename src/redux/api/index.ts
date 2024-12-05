import { BaseQueryFn, fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL_API,
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const results = baseQuery(args, api, extraOptions);

  return results;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['camera'],
  endpoints: () => ({}),
});
