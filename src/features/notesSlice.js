import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notesServices from "../services/notes.services";

const initialState = {
  note: [],
  uniqueCompany: [],
  selectedCompanyFilters: [],
  filteredNotes: [],
  selectedCompanyCount: 0,
  isModalOpen: false,
  loading: false,
  error: null,
};

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
  initialState,
  reducers: {
    handleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    uniqueCompanies: (state) => {
      const key = "company";
      state.uniqueCompany = [
        ...new Map(state.note.map((item) => [item[key], item])).values(),
      ];
    },

    sortNotes: (state, action) => {
      const sortBy = action.payload;
      const tempArr =
        state.filteredNotes.length > 0 ? state.filteredNotes : state.note;

      if (sortBy === "active") {
        tempArr.sort((a, b) => a.status.localeCompare(b.status));
      } else if (sortBy === "closed") {
        tempArr.sort((a, b) => b.status.localeCompare(a.status));
      }
      state.filteredNotes.length > 0
        ? (state.filteredNotes = tempArr)
        : (state.note = tempArr);
    },

    handleChangeCheckboxList: (state, action) => {
      const name = action.payload.target.name;
      const checked = action.payload.target.checked;

      if (name === "selectAll") {
        let tempNotes = (
          state.filteredNotes.length > 0 ? state.filteredNotes : state.note
        ).map((note) => {
          return { ...note, isSelected: checked };
        });
        state.filteredNotes.length > 0
          ? (state.filteredNotes = tempNotes)
          : (state.note = tempNotes);
      } else {
        let tempNotes = (
          state.filteredNotes.length > 0 ? state.filteredNotes : state.note
        ).map((note) =>
          note.id === name ? { ...note, isSelected: checked } : note
        );
        state.filteredNotes.length > 0
          ? (state.filteredNotes = tempNotes)
          : (state.note = tempNotes);
      }
    },

    handleCompanySelect: (state, action) => {
      const SelectedCompany = action.payload.target.name;
      const checked = action.payload.target.checked;

      if (SelectedCompany === "selectAll") {
        let tempUniqueCompany = state.uniqueCompany.map((company) => {
          return { ...company, isCompanySelected: checked };
        });

        state.uniqueCompany = tempUniqueCompany;

        if (checked) {
          state.selectedCompanyFilters = state.uniqueCompany.map(
            (note) => note.company
          );
        } else {
          state.selectedCompanyFilters = [];
        }
      } else {
        let tempUniqueCompany = state.uniqueCompany.map((company) =>
          company.company === SelectedCompany
            ? { ...company, isCompanySelected: checked }
            : company
        );
        state.uniqueCompany = tempUniqueCompany;

        if (state.selectedCompanyFilters.includes(SelectedCompany)) {
          let filters = state.selectedCompanyFilters.filter(
            (el) => el !== SelectedCompany
          );
          state.selectedCompanyFilters = filters;
        } else {
          state.selectedCompanyFilters = [
            ...state.selectedCompanyFilters,
            SelectedCompany,
          ];
        }
      }

      if (state.selectedCompanyFilters.length > 0) {
        let tempNotes = state.selectedCompanyFilters.map((SelectedCompany) => {
          return state.note.filter((note) => note.company === SelectedCompany);
        });
        state.filteredNotes = [...tempNotes.flat()];
      } else {
        state.filteredNotes = [...state.note];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
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
        state.note = action.payload;
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

export const {
  uniqueCompanies,
  handleCompanySelect,
  handleChangeCheckboxList,
  sortNotes,
  handleModal,
} = notes.actions;
export const selectAllNotes = (state) => state.notes.note;
export const selectUniqueCompany = (state) => state.notes.uniqueCompany;
export const selectFilteredNotes = (state) => state.notes.filteredNotes;
export const selectLoading = (state) => state.notes.loading;
export const isModalOpen = (state) => state.notes.isModalOpen;
export const selectedCompanyCount = (state) =>
  state.notes.selectedCompanyFilters.length;
export const notesReducer = notes.reducer;
