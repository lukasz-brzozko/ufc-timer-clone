/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface InfoState {
  message: string;
}

const initialState: InfoState = {
  message: 'Trunk color',
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const selectMessage = (state: RootState): string => state.info.message;

export const { setMessage } = infoSlice.actions;

export default infoSlice.reducer;
