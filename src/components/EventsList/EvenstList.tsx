import React from 'react';
import { EventItem } from '../EventItem';
import data from '../../data.json';

import './EventsList.scss';

export const EventsList = () => {
  return (
    <ul className="main__events-list events-list">
      {data.slice(0, 10).map((eventItem) => (
        <EventItem key={eventItem.id} eventItem={eventItem} />
      ))}
    </ul>
  );
};
