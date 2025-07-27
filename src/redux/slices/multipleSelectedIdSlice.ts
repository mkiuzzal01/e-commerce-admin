import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Image {
  _id: string;
  photo: {
    url: string;
  };
  photoName: string;
}

interface SelectionState {
  singleSelected: Image | null;
  multipleSelected: Image[];
}

const initialState: SelectionState = {
  singleSelected: null,
  multipleSelected: [],
};

const selectionSlice = createSlice({
  name: "imageSelection",
  initialState,
  reducers: {
    // Single selection actions
    selectSingleImage: (state, action: PayloadAction<Image>) => {
      state.singleSelected = action.payload;
      // Clear multiple selection when single selecting
      state.multipleSelected = [];
    },
    clearSingleSelection: (state) => {
      state.singleSelected = null;
    },

    // Multiple selection actions
    toggleMultipleImage: (state, action: PayloadAction<Image>) => {
      const existingIndex = state.multipleSelected.findIndex(
        (img) => img._id === action.payload._id
      );
      if (existingIndex >= 0) {
        state.multipleSelected.splice(existingIndex, 1);
      } else {
        state.multipleSelected.push(action.payload);
      }
    },
    clearMultipleSelection: (state) => {
      state.multipleSelected = [];
    },
    setMultipleSelection: (state, action: PayloadAction<Image[]>) => {
      state.multipleSelected = action.payload;
    },
  },
});

export const {
  selectSingleImage,
  clearSingleSelection,
  toggleMultipleImage,
  clearMultipleSelection,
  setMultipleSelection,
} = selectionSlice.actions;

export default selectionSlice.reducer;
