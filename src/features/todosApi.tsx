import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Itodo } from "../models/todo.model";
const baseUrl = "http://localhost:3001";
export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query<Itodo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    getTodo: builder.query<Itodo, string>({
      query: (id) => `/todos/${id}`,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<void, Itodo>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<void, Itodo>({
      query: ({ id, ...restProps }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: restProps,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, String>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
}: any = todosApi;
