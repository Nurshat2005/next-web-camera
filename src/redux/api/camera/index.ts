import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query<ITodoType.getToResponse, ITodoType.getToRequest>({
      query: () => ({
        method: 'GET',
        url: '/580a50285cdc8f4a811510a575d902e6/camera',
      }),
      providesTags: ['camera'],
    }),
    postTodo: build.mutation({
      query: (data) => ({
        method: 'POST',
        url: '/580a50285cdc8f4a811510a575d902e6/camera',
        body: data,
      }),
      invalidatesTags: ['camera'],
    }),
    updateTodo: build.mutation({
      query: (data) => ({
        method: 'POST',
        url: 'upload/file',
        body: data,
      }),
      invalidatesTags: ['camera'],
    }),
  }),
  overrideExisting: true,
});
export const { useGetTodoQuery, usePostTodoMutation, useUpdateTodoMutation } = api;
