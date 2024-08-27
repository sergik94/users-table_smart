import React, { useMemo } from 'react';
import { EventItem } from '../EventItem';

import './EventsList.scss';
import { useSearchParams } from 'react-router-dom';
import { sortItems } from '../../features/sortItems';
import { filterItems } from '../../features/filterItems';
import { eventsSelector } from '../../store/selectors';
import { useAppSelector } from '../../store/hooks';

export const EventsList = () => {
  const events = useAppSelector(eventsSelector);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'date';
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  const modifiedItemsList = useMemo(() => {
    let modifiedArray = [...events];

    if (!sort && !query) {
      return events;
    }

    if (query || dateFrom || dateTo) {
      modifiedArray = filterItems(modifiedArray, query, dateFrom, dateTo);
    }

    if (sort) {
      return sortItems(modifiedArray, sort);
    }

    return modifiedArray;
  }, [sort, query, dateFrom, dateTo, events]);

  return (
    <>
      <ul className="main__events-list events-list">
        {modifiedItemsList.map((eventItem) => (
          <EventItem key={eventItem.id} eventItem={eventItem} />
        ))}
      </ul>
    </>
  );
};
