import { combineReducers, createStore } from 'redux';
import EventsReducer from '../reducers/eventsReducer';
import TicketsReducer from '../reducers/ticketsReducer';

const rootReducer = combineReducers({
  eventsReducer: EventsReducer,
  ticketsReducer: TicketsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
