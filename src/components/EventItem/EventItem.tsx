import React from 'react';
import { EventItem as EventItemType } from '../../types/eventItem';

import './EventItem.scss';

type Props = {
  eventItem: EventItemType;
};

export const EventItem: React.FC<Props> = ({ eventItem }) => {
  const formattedDate = new Date(eventItem.date).toLocaleDateString();

  return (
    <li className="main__event event">
      <a href="">
        <img
          className="event__img"
          src={eventItem.posterURL}
          alt={eventItem.title}
        />
      </a>

      <h3 className="event__title">
        <a href="">{eventItem.title}</a>
      </h3>

      <div className="event__info">
        <div className="event__date">{formattedDate}</div>
        <div className="event__tickets">
          Tickets: {eventItem.availableTickets}
        </div>
      </div>
    </li>
  );
};
