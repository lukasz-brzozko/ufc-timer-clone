import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import clockReducer from '../features/clock/clockSlice';
import infoReducer from '../features/info/infoSlice';
import roundCounter from '../features/roundCounter/roundCounterSlice';
import timerReducer from '../features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    clock: clockReducer,
    info: infoReducer,
    roundCounter: roundCounter,
    timer: timerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
