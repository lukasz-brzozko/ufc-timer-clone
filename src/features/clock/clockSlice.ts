/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface ClockState {
  minutes: number
}

const initialState: ClockState = {
  minutes: 5,
};

export const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {

  },
});

export const selectClockTime = (state: RootState): number => state.clock.minutes;

// export const { setClockTime } = clockSlice.actions;

export default clockSlice.reducer;
