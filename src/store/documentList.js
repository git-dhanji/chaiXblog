import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwrite from "../appwrite/config";

// Define the async action creator using createAsyncThunk
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    try {
      const response = await appwrite.getPosts();
      return response.documents;
    } catch (error) {
      throw new Error("Failed to fetch documents");
    }
  }
);

const initialState = {
  data: [],
  buffering: false,
  error: null,
  fetched: false,
};

const documentSlice = createSlice({
  name: "documentlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.buffering = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.buffering = false;
        state.data = action.payload;
        state.fetched = true;
        state.error = null;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.buffering = false;
        state.error = action.error.message;
      });
  },
});

// Handle async action creators
export const asyncActions = {
  fetchDocuments,
};

export default documentSlice.reducer;
