/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import gsap from 'gsap';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface TimelineState {
  tl: gsap.core.Timeline
}

const initialState: TimelineState = {
  tl: gsap.timeline({ defaults: { duration: 0.6 } }),
};

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
});

export const selectTimeline = (state: RootState): gsap.core.Timeline => state.timeline.tl;

export default timelineSlice.reducer;
