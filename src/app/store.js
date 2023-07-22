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
        ignoredActions: ["notes/uniqueCompanies", "getNotes/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["notes.note.0.lastUpdated"],
        // Ignore these paths in the state
        ignoredPaths: [
          "notes.note.0.lastUpdated",
          "notes.note.1.lastUpdated",
          "notes.note.2.lastUpdated",
          "notes.note.3.lastUpdated",
          "notes.note.4.lastUpdated",
          "notes.note.5.lastUpdated",
          "notes.note.6.lastUpdated",
          "notes.note.7.lastUpdated",
          "notes.note.8.lastUpdated",
          "notes.note.9.lastUpdated",
          "notes.note.10.lastUpdated",
          "notes.note.11.lastUpdated",

          "notes.uniqueCompany.0.lastUpdated",
          "notes.uniqueCompany.1.lastUpdated",
          "notes.uniqueCompany.2.lastUpdated",
          "notes.uniqueCompany.3.lastUpdated",
          "notes.uniqueCompany.4.lastUpdated",
          "notes.uniqueCompany.5.lastUpdated",
          "notes.uniqueCompany.6.lastUpdated",
          "notes.uniqueCompany.7.lastUpdated",
          "notes.uniqueCompany.8.lastUpdated",
          "notes.uniqueCompany.9.lastUpdated",
          "notes.uniqueCompany.10.lastUpdated",
          "notes.uniqueCompany.11.lastUpdated",
        ],
      },
    }),
});
