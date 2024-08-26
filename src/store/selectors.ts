import { RootState } from './store';

export const eventsSelector = (state: RootState) => state.eventsReducer;
export const ticketsSelector = (state: RootState) => state.ticketsReducer;
