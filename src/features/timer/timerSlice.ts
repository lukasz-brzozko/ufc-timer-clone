/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

type ContestantType = {
  color: string;
  id: number;
  name: string;
  rank: 'C' | number | null
};

export interface TimerState {
  contestants: [ContestantType, ContestantType];
}

const initialState: TimerState = {
  contestants: [
    {
      color: 'red',
      id: 1,
      name: 'Contestant 1',
      rank: null,
    },
    {
      color: 'blue',
      id: 2,
      name: 'Contestant 2',
      rank: null,
    },
  ],
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<[ContestantType, ContestantType]>) => {
      state.contestants = action.payload;
    },
  },
});

export const selectContestants = (state: RootState) => state.timer.contestants;

export const { update } = timerSlice.actions;

export default timerSlice.reducer;
