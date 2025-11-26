import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlotWithItem } from '../typings';

interface ContextMenuState {
  item: SlotWithItem | null;
  inventoryType?: string;
}

const initialState: ContextMenuState = {
  item: null,
  inventoryType: undefined,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openContextMenu(state, action: PayloadAction<{ item: SlotWithItem; inventoryType?: string }>) {
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType;
    },
    closeContextMenu(state) {
      return;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;