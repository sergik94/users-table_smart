import eventItems from '../data/events.json';
import tickets from '../data/tickets.json';

import { client } from '../api/api';

export const getEvents = async () => {
  return await client.get(eventItems);
};

export const getTickets = async () => {
  return await client.get(tickets);
};
