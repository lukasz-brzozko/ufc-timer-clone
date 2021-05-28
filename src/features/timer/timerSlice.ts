/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import COLORS, { Color } from '../../constants/colors';

export type ContestantType = {
  champion: boolean;
  color: Color;
  id: number;
  lastName: string;
  rank: number
};

export type ContestantsTuple = [ContestantType, ContestantType];

export type ContestantsColorsPayload = {
  color: string,
  targetIndex: number
};
export interface TimerState {
  contestants: ContestantsTuple;
}

const initialState: TimerState = {
  contestants: [
    {
      champion: true,
      color: COLORS.BLACK,
      id: 1,
      lastName: 'Nurmagomedov',
      rank: 1,
    },
    {
      champion: false,
      color: COLORS.GREEN,
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
    setContestantsColors: (state, action: PayloadAction<ContestantsColorsPayload>) => {
      const colorEntries = Object.values(COLORS);
      const chosenColor = colorEntries.find((color) => color.code === action.payload.color);
      if (chosenColor !== undefined) {
        state.contestants[action.payload.targetIndex].color = chosenColor;
      }
    },

    updateContestants: (state, action: PayloadAction<ContestantsTuple>) => {
      state.contestants = action.payload;
    },
  },

});

export const selectContestants = (state: RootState): ContestantsTuple => state.timer.contestants;

export const { setContestantsColors, updateContestants } = timerSlice.actions;

export default timerSlice.reducer;
