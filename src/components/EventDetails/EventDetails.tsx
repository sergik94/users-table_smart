import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { eventsSelector, ticketsSelector } from '../../store/selectors';

import './EventDetails.scss';
import { getDateForCalendar } from '../../features/getDateForCalendar';
import { formatDate } from '../../features/formatDate';

export const EventDetails = () => {
  const { eventId = '' } = useParams();
  const eventsList = useAppSelector(eventsSelector);
  const ticketsList = useAppSelector(ticketsSelector);

  const eventItem = eventsList.find((ev) => ev.id === +eventId);
  const tickets = ticketsList.find((t) => t.eventId === +eventId);

  const route = '/events/' + eventId;

  return (
    <section className="main__event-details event-details">
      <div className="event-details__container">
        <Link className="event-details__edit" to={route + '/edit'}></Link>

        <div className="event-details__poster">
          {eventItem?.posterURL === '' ? (
            <div className="event-details__no-poster">No poster</div>
          ) : (
            <img src={eventItem?.posterURL} alt={eventItem?.title} />
          )}
        </div>

        <div className="event-details__details">
          <h2 className="event-details__title">{eventItem?.title}</h2>

          <div className="event-details__info">{eventItem?.description}</div>

          <div className="event-details__info">
            <span>Date:</span>
            {formatDate(
              getDateForCalendar(new Date(eventItem?.date || new Date())),
            )}
          </div>

          <div className="event-details__info event-details__info--time">
            <span>Time:</span> {eventItem?.date?.split('T')[1]?.slice(0, 5)}
          </div>

          <div className="event-details__additional">
            <h3 className="event-details__subtitle">Additional information:</h3>

            <div className="event-details__info event-details__info--type">
              <span>Event type:</span> {eventItem?.eventType || 'No data'}
            </div>

            <div className="event-details__info">
              <span>Location:</span> {eventItem?.location || 'No data'}
            </div>
          </div>

          <div className="event-details__tickets">
            <h3 className="event-details__subtitle">Tickets</h3>

            <ul className="event-details__tickets-list">
              {tickets?.categories.map((t) => (
                <li className="event-details__ticket" key={t.title}>
                  <div className="event-details__ticket-title">{t.title}</div>
                  <div className="event-details__ticket-info">
                    Amount:
                    <span>{t.amount}</span>
                  </div>
                  <div className="event-details__ticket-info">
                    Price:
                    <span>{t.price} UAH</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
