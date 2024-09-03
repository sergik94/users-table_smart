import { User } from '../types/user';

type LoadUsers = {
  type: 'users/LOAD';
  payload: User[];
};

type Actions = LoadUsers;

export const actions = {
  load: (items: User[]): LoadUsers => ({
    type: 'users/LOAD',
    payload: items,
  }),
};

const UsersReducer = (items: User[] = [], action: Actions): User[] => {
  switch (action.type) {
    case 'users/LOAD':
      return action.payload;

    default:
      return items;
  }
};

export default UsersReducer;
