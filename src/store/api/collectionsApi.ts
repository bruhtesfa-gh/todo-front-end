import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface Collection {
  id: string;
  name: string;
  image: string;
  tasksCompleted: number;
  totalTasks: number;
  isFavorite: boolean;
}

interface UpdateCollectionRequest {
  id: string;
  name?: string;
  isFavorite?: boolean;
}

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
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
  tagTypes: ["Collection"],
  endpoints: (builder) => ({
    getCollections: builder.query<Collection[], void>({
      query: () => "/collection",
      providesTags: ["Collection"],
    }),
    addCollection: builder.mutation<
      Collection,
      { name: string; image: string }
    >({
      query: ({ name, image }) => ({
        url: "/collection",
        method: "POST",
        body: { name, image },
      }),
      invalidatesTags: ["Collection"],
    }),
    updateCollection: builder.mutation<Collection, UpdateCollectionRequest>({
      query: ({ id, ...patch }) => ({
        url: `/collection/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Collection"],
    }),
    deleteCollection: builder.mutation<void, string>({
      query: (id) => ({
        url: `/collection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
  useAddCollectionMutation,
  useDeleteCollectionMutation,
} = collectionsApi;
