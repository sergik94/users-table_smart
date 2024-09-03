import { client } from '../api/api';
import { User } from '../types/user';

export const getUsers = async () => {
  return await client.get<User[]>('/users');
};
