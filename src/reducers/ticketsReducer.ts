import { Ticket } from '../types/ticket';

type LoadTickets = {
  type: 'tickets/LOAD';
  payload: Ticket[];
};

type AddTickets = {
  type: 'tickets/ADD';
  payload: Ticket;
};

type EditTickets = {
  type: 'tickets/EDIT';
  payload: Ticket;
};

type Actions = LoadTickets | AddTickets | EditTickets;

export const actions = {
  load: (items: Ticket[]): LoadTickets => ({
    type: 'tickets/LOAD',
    payload: items,
  }),
  add: (item: Ticket): AddTickets => ({ type: 'tickets/ADD', payload: item }),
  edit: (item: Ticket): EditTickets => ({
    type: 'tickets/EDIT',
    payload: item,
  }),
};

const TicketsReducer = (items: Ticket[] = [], action: Actions): Ticket[] => {
  let updateTickets = items;

  switch (action.type) {
    case 'tickets/LOAD':
      return action.payload;

    case 'tickets/ADD': {
      updateTickets = [...items, action.payload];

      break;
    }

    case 'tickets/EDIT': {
      updateTickets = items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });

      break;
    }

    default:
      return items;
  }

  return updateTickets;
};

export default TicketsReducer;
