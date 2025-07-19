import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SelectedIdState {
  selectedId: string | null;
}

const initialState: SelectedIdState = {
  selectedId: null,
};

const selectedIdSlice = createSlice({
  name: "selectedId",
  initialState,
  reducers: {
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    clearSelectedId(state) {
      state.selectedId = null;
    },
  },
});

export const { setSelectedId, clearSelectedId } = selectedIdSlice.actions;
export default selectedIdSlice.reducer;
