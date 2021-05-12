import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import infoReducer from '../features/info/infoSlice';
import timelineReducer from '../features/timeline/timelineSlice';
import timerReducer from '../features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    info: infoReducer,
    timeline: timelineReducer,
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
