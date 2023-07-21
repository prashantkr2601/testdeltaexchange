import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notesServices from "../services/notes.services";

export const createNote = createAsyncThunk(
  "createNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await notesServices.addNote(noteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllNotes = createAsyncThunk(
  "getNotes",
  async (args, { rejectWithValue }) => {
    try {
      const response = await notesServices.getNotes();
      const result = await response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error", err.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "deleteNote",
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await notesServices.deleteNote(noteId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const notes = createSlice({
  name: "notes",
  initialState: { note: [], loading: false, error: null },

  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.note.push(action.meta.arg);
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.note = state.note.concat(action.payload);
        state.error = null;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg;
        if (id) {
          state.note = state.note.filter((data) => data.id !== id);
        }
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllNotes = (state) => state.notes.note;
