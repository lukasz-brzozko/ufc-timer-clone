/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import ROUNDS from '../../constants/rounds';

type Rounds = (typeof ROUNDS)[keyof typeof ROUNDS];
type StandardRounds = 1 | 2 | 3;
type ChampionshipRounds = 4 | 5;
type ActiveRound = StandardRounds | ChampionshipRounds;

export interface RoundCounterState {
  rounds: Rounds;
  activeRound: ActiveRound
}

const initialState: RoundCounterState = {
  rounds: 3,
  activeRound: 2,
};

export const roundCounterSlice = createSlice({
  name: 'roundCounter',
  initialState,
  reducers: {
    setActiveRound: (state, action: PayloadAction<RoundCounterState>) => {
      state.activeRound = action.payload.activeRound;
    },

    setRoundsCount: (state, action: PayloadAction<RoundCounterState>) => {
      state.rounds = action.payload.rounds;
    },

    setRoundCounter: (state, action: PayloadAction<RoundCounterState>) => {
      state.activeRound = action.payload.activeRound;
      state.rounds = action.payload.rounds;
    },
  },
});

export const selectRoundsCounter = (state: RootState): RoundCounterState => state.roundCounter;
export const selectRoundsCount = (state: RootState): Rounds => state.roundCounter.rounds;
export const selectActiveRound = (state: RootState): ActiveRound => {
  const { activeRound, rounds } = state.roundCounter;
  return activeRound > rounds ? rounds : activeRound;
};

export const { setActiveRound, setRoundsCount, setRoundCounter } = roundCounterSlice.actions;

export default roundCounterSlice.reducer;
