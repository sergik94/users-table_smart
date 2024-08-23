import React from 'react';
import './EventsActions.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Dropdown';
import { getSearchBy } from '../../features/getSerchBy';

export const EventsActions = () => {
  const sortedList = ['date', 'title'];
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchBy(searchParams, {
      query: `${e.currentTarget.value}` || null,
    });

    setSearchParams(newSearchParams);
  };

  const getDateForCalendar = (date: Date) => {
    return date.toJSON().split('T')[0];
  };
  const formatDate = (date: string) => {
    return date.split('-').reverse().join('.');
  };
  const now = new Date();
  const minInputDate = getDateForCalendar(now);
  const maxInputDate = getDateForCalendar(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 365),
  );
  const handleFromSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchBy(searchParams, {
      dateFrom: `${e.currentTarget.value}` || null,
    });

    setSearchParams(newSearchParams);
  };

  const handleToSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchBy(searchParams, {
      dateTo: `${e.currentTarget.value}` || null,
    });

    setSearchParams(newSearchParams);
  };

  const handleSortBy = (item: string) => {
    const newSearchParams = getSearchBy(searchParams, {
      sort: item || null,
    });

    setSearchParams(newSearchParams);
  };

  return (
    <div className="main__events-actions">
      <div className="main__sorts-filters sorts-filters">
        <label className="sorts-filters__byTitle inputfield">
          <input
            type="text"
            value={query}
            placeholder="Search event by title..."
            onChange={onChangeQuery}
          />
        </label>

        <div className="sorts-filters__byDates">
          <label className="sorts-filters__byDate inputfield">
            <span>{formatDate(dateFrom) || 'Date from'}</span>
            <input
              type="date"
              min={minInputDate}
              max={dateTo === '' ? maxInputDate : dateTo}
              onChange={handleFromSelection}
            />
          </label>

          <span className="sorts-filters__dash"></span>

          <label className="sorts-filters__byDate inputfield">
            <span>{formatDate(dateTo) || 'Date to'}</span>
            <input
              type="date"
              min={dateFrom === '' ? minInputDate : dateFrom}
              max={maxInputDate}
              onChange={handleToSelection}
            />
          </label>
        </div>

        <Dropdown value={sort} itemsList={sortedList} callback={handleSortBy} />
      </div>

      <Link to={'/create'} className="main__create-event">
        Add event
      </Link>
    </div>
  );
};
