import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  collectionId: number;
  parentTodoId: number | null;
  childTodos: Todo[];
}

interface AddTodoRequest {
  title: string;
  description: string;
  dueDate?: string;
  collectionId: number;
  parentTodoId?: number | null;
  completed: boolean;
}

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
      const tokenFromLocalStorage = localStorage.getItem("authToken");
      if (tokenFromLocalStorage) {
        headers.set("authorization", `Bearer ${tokenFromLocalStorage}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getCollectionTodos: builder.query<Todo[], string>({
      query: (collectionId) => `/todos/collection/${collectionId}`,
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation<Todo, AddTodoRequest>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo> & { id: number }>({
      query: ({ id, ...update }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetCollectionTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
