import { EventItem } from '../types/eventItem';

type LoadEvents = {
  type: 'events/LOAD';
  payload: EventItem[];
};

type AddEvent = {
  type: 'events/ADD';
  payload: EventItem;
};

type Actions = LoadEvents | AddEvent;

export const actions = {
  load: (items: EventItem[]): LoadEvents => ({
    type: 'events/LOAD',
    payload: items,
  }),
  add: (item: EventItem): AddEvent => ({ type: 'events/ADD', payload: item }),
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

    default:
      return items;
  }

  return updatedEvents;
};

export default EventsReducer;
