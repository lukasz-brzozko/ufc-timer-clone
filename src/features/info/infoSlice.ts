/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import BOUTS from '../../constants/bouts';
import INFOTEXT from '../../constants/infoText';

export type InfoType = INFOTEXT | BOUTS;
export interface InfoState {
  bout: BOUTS;
  message: InfoType;
}

const initialState: InfoState = {
  bout: BOUTS.LIGHTWEIGHT,
  message: INFOTEXT.TRUNK_COLOR,
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setBout: (state, action: PayloadAction<BOUTS>) => {
      state.bout = action.payload;
    },
    setMessage: (state, action: PayloadAction<InfoType>) => {
      state.message = action.payload;
    },
  },
});

export const selectBout = (state: RootState): BOUTS => state.info.bout;
export const selectMessage = (state: RootState): InfoType => state.info.message;

export const { setBout, setMessage } = infoSlice.actions;

export default infoSlice.reducer;
