import React from 'react';
import { EventItem as EventItemType } from '../../types/eventItem';

import './EventItem.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { ticketsSelector } from '../../store/selectors';
import { getTotalTickets } from '../../features/getTotalTickets';

type Props = {
  eventItem: EventItemType;
};

export const EventItem: React.FC<Props> = ({ eventItem }) => {
  const formattedDate = new Date(eventItem.date).toLocaleDateString();
  const ticketsData = useAppSelector(ticketsSelector);
  const currTickets = ticketsData.find((t) => t.eventId === eventItem.id);
  const totalTickets = getTotalTickets(currTickets?.categories);
  const route = '/events/' + eventItem.id;

  return (
    <li className="main__event event">
      <Link className="event__edit" to={route + '/edit'}></Link>

      <Link to={route}>
        {eventItem?.posterURL === '' ? (
          <div className="event__no-poster">No poster</div>
        ) : (
          <img
            src={eventItem.posterURL}
            alt={eventItem.title}
            className="event__img"
          />
        )}
      </Link>

      <h3 className="event__title">
        <Link to={route}>{eventItem.title}</Link>
      </h3>

      <div className="event__info">
        <div className="event__date">{formattedDate}</div>
        <div className="event__tickets">Tickets: {totalTickets}</div>
      </div>
    </li>
  );
};
