import { EventItem } from '../types/eventItem';

type LoadEvents = {
  type: 'events/LOAD';
  payload: EventItem[];
};

type AddEvent = {
  type: 'events/ADD';
  payload: EventItem;
};

type EditEvent = {
  type: 'events/EDIT';
  payload: EventItem;
};

type Actions = LoadEvents | AddEvent | EditEvent;

export const actions = {
  load: (items: EventItem[]): LoadEvents => ({
    type: 'events/LOAD',
    payload: items,
  }),
  add: (item: EventItem): AddEvent => ({ type: 'events/ADD', payload: item }),
  edit: (item: EventItem): EditEvent => ({
    type: 'events/EDIT',
    payload: item,
  }),
};

const EventsReducer = (
  items: EventItem[] = [],
  action: Actions,
): EventItem[] => {
  let updatedEvents = items;

  switch (action.type) {
    case 'events/LOAD':
      return action.payload;

    case 'events/ADD': {
      updatedEvents = [...items, action.payload];

      break;
    }

    case 'events/EDIT': {
      updatedEvents = items.map((item) => {
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

  return updatedEvents;
};

export default EventsReducer;
