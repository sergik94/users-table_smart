import { combineReducers, createStore } from 'redux';
import UsersReducer from '../reducers/usersReducer';

const rootReducer = combineReducers({
  userReducer: UsersReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
