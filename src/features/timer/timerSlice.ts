/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export type ContestantType = {
  champion: boolean;
  color: string;
  id: number;
  lastName: string;
  rank: number
};

export type ContestantsTuple = [ContestantType, ContestantType];
export interface TimerState {
  contestants: ContestantsTuple;
}

const initialState: TimerState = {
  contestants: [
    {
      champion: true,
      color: 'gold',
      id: 1,
      lastName: 'Nurmagomedov',
      rank: 1,
    },
    {
      champion: false,
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
    updateContestants: (state, action: PayloadAction<ContestantsTuple>) => {
      state.contestants = action.payload;
    },
  },

});

export const selectContestants = (state: RootState): ContestantsTuple => state.timer.contestants;

export const { updateContestants } = timerSlice.actions;

export default timerSlice.reducer;
