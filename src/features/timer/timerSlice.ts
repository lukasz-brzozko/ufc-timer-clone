/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export type ContestantType = {
  color: string;
  id: number;
  lastName: string;
  rank: 'C' | number | null;
};

export type ContestantsTuple = [ContestantType, ContestantType];

export interface TimerState {
  contestants: ContestantsTuple;
}

const initialState: TimerState = {
  contestants: [
    {
      color: 'red',
      id: 1,
      lastName: 'Nurmagomedov',
      rank: 1,
    },
    {
      color: 'blue',
      id: 2,
      lastName: 'McGregor',
      rank: 13,
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

export const selectContestants = (state: RootState): ContestantsTuple => state.timer.contestants;

export const { update } = timerSlice.actions;

export default timerSlice.reducer;
