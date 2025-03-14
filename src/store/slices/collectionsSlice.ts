import { createSlice } from "@reduxjs/toolkit";
import { Collection } from "../api/collectionsApi";

interface CollectionsState {
  collections: Collection[];
  selectedCollection: Collection | null;
}

const initialState: CollectionsState = {
  collections: [],
  selectedCollection: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    addCollection: (state, action) => {
      state.collections.push(action.payload);
    },
    updateCollection: (state, action) => {
      const index = state.collections.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.collections[index] = action.payload;
      }
    },
    deleteCollection: (state, action) => {
      state.collections = state.collections.filter(
        (c) => c.id !== action.payload
      );
    },
    setSelectedCollection: (state, action) => {
      state.selectedCollection = action.payload;
    },
  },
});

export const {
  setCollections,
  addCollection,
  updateCollection,
  deleteCollection,
  setSelectedCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
