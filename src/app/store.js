import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "../features/notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["notes"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "payload",
          "note",
          "filteredNotes",
          "uniqueCompany",
          "selectedCompanyFilters",
          "loading",
          "error",
          "meta.arg",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["notes", "note"],
      },
    }),
});
