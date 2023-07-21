import { configureStore } from "@reduxjs/toolkit";
import { notes } from "../features/notesSlice";

export const store = configureStore({
  reducer: {
    notes: notes.reducer,
  },
});
