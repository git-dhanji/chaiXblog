import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwrite from "../appwrite/config";
import { SAMPLE_POSTS } from "../data/samplePosts";

// Define the async action creator using createAsyncThunk
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    // getPosts() returns `false` on an Appwrite error, so guard against it
    // and always resolve to an array. Fall back to built-in demo articles
    // when the backend has no posts yet.
    const response = await appwrite.getPosts();
    const docs =
      response && Array.isArray(response.documents) ? response.documents : [];
    return docs.length ? docs : SAMPLE_POSTS;
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
        state.data = Array.isArray(action.payload) ? action.payload : [];
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
