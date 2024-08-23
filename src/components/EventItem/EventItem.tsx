import React from 'react';
import { EventItem as EventItemType } from '../../types/eventItem';

import './EventItem.scss';
import { Link } from 'react-router-dom';

type Props = {
  eventItem: EventItemType;
};

export const EventItem: React.FC<Props> = ({ eventItem }) => {
  const formattedDate = new Date(eventItem.date).toLocaleDateString();
  const route = eventItem.title.split(' ').join('-');

  return (
    <li className="main__event event">
      <Link className="event__edit" to={route + '/edit'}></Link>

      <Link to={route}>
        <img
          className="event__img"
          src={eventItem.posterURL}
          alt={eventItem.title}
        />
      </Link>

      <h3 className="event__title">
        <Link to={route}>{eventItem.title}</Link>
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
