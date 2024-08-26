import { RootState } from './store';

export const eventsSelector = (state: RootState) => state.eventsReducer;
