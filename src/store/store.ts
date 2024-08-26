import { combineReducers, createStore } from 'redux';
import EventsReducer from '../reducers/eventsReducer';

const rootReducer = combineReducers({
  eventsReducer: EventsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
