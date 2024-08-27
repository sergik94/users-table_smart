import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './AddEventForm.scss';
import { Dropdown } from '../Dropdown';
import { formatDate } from '../../features/formatDate';
import { getDateForCalendar } from '../../features/getDateForCalendar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { eventsSelector, ticketsSelector } from '../../store/selectors';
import { getTotalTickets } from '../../features/getTotalTickets';
import { actions as eventActions } from '../../reducers/eventsReducer';
import { actions as ticketActions } from '../../reducers/ticketsReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventItem } from '../../types/eventItem';

const eventsTypeList = ['concert', 'festival', 'theatre', 'other'];

export const AddEventForm = () => {
  const events = useAppSelector(eventsSelector);
  const ticketsData = useAppSelector(ticketsSelector);

  const navigate = useNavigate();
  const pathArray = useLocation().pathname.split('/');
  const isEdit = pathArray.at(-1) === 'edit';

  let initialEvent: EventItem;
  let currTickets;
  const initialTickets = {
    id: ticketsData.length + 1,
    eventId: events.length + 1,
    categories: [
      {
        title: 'category 1',
        amount: 0,
        price: 0,
      },
    ],
  };

  if (isEdit) {
    initialEvent = events.find(
      (ev) => ev.id === +(pathArray.at(-2) || 0),
    ) as EventItem;
    currTickets = ticketsData.find(
      (t) => t.eventId === +(pathArray.at(-2) || 0),
    );
  } else {
    initialEvent = {
      id: events.length + 1,
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      eventType: '',
      posterURL: '',
    };
  }

  const [title, setTitle] = useState(initialEvent?.title || '');
  const [description, setDescription] = useState(
    initialEvent?.description || '',
  );
  const [date, setDate] = useState(
    initialEvent.date ? getDateForCalendar(new Date(initialEvent.date)) : '',
  );
  const [time, setTime] = useState(
    initialEvent?.date?.split('T')[1]?.slice(0, 5) || '',
  );
  const [location, setLocation] = useState(initialEvent?.location || '');
  const [eventType, setEventType] = useState(initialEvent?.eventType || '');
  const [posterURL, setPosterURL] = useState(initialEvent?.posterURL || '');
  const [isSubmit, setSubmit] = useState(false);

  const [tickets, setTickets] = useState(currTickets || initialTickets);

  const dispatch = useAppDispatch();

  const minInputDate = getDateForCalendar(new Date());

  const selectEvetType = (item: string) => {
    setEventType(item);
  };

  const addTicketsCategory = () => {
    setTickets((prev) => {
      return {
        ...prev,
        categories: [
          ...prev.categories,
          {
            title: `category ${prev.categories.length + 1}`,
            amount: 0,
            price: 0,
          },
        ],
      };
    });
  };

  const removeTicketsCategory = (category: string) => {
    setTickets((prev) => {
      const filteredCategories = prev.categories.filter(
        (c) => c.title !== category,
      );

      const newCategoriesSet = filteredCategories.map((c, i) => {
        return {
          ...c,
          title: 'category ' + (i + 1),
        };
      });
      return {
        ...prev,
        categories: newCategoriesSet,
      };
    });
  };

  const handleCategoryAmountChange = (
    title: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTickets((prev) => {
      const updatedCategories = prev.categories.map((category) => {
        if (category.title === title) {
          if (isNaN(+e.target.value)) {
            return category;
          }

          return {
            ...category,
            amount: +e.target.value,
          };
        }

        return category;
      });

      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const handleCategoryPriceChange = (
    title: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTickets((prev) => {
      const updatedCategories = prev.categories.map((category) => {
        if (category.title === title) {
          if (isNaN(+e.target.value)) {
            return category;
          }

          return {
            ...category,
            price: +e.target.value,
          };
        }

        return category;
      });

      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setEventType('');
    setPosterURL('');
    setTickets(initialTickets);
    setSubmit(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);

    if (!title || !description || !date || !time) return;

    const eventData = {
      id: initialEvent.id,
      title,
      description,
      date: getDateForCalendar(new Date(date)) + 'T' + time,
      availableTickets: getTotalTickets(tickets.categories),
      eventType,
      location,
      posterURL,
    };

    if (!isEdit) {
      dispatch(eventActions.add(eventData));
      dispatch(ticketActions.add(tickets));
    } else {
      dispatch(eventActions.edit(eventData));
      dispatch(ticketActions.edit(tickets));
    }

    resetForm();
    navigate('/');
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    setSubmit(false);
  }, [title, description, date, time]);

  return (
    <form className="main__eventForm event-form" onSubmit={handleSubmit}>
      <h3 className="event-form__head">Main information</h3>
      <div className="event-form__main">
        <label
          className={cn('event-form__title', 'inputfield', {
            'inputfield--error': isSubmit && !title,
          })}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>

        <label
          className={cn('event-form__description', {
            'inputfield--error': isSubmit && !description,
          })}
        >
          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </label>

        <label
          className={cn('event-form__date', 'inputfield', {
            'inputfield--error': isSubmit && !date,
          })}
        >
          <span>{formatDate(date) || 'Date'}</span>
          <input
            type="date"
            value={formatDate(date)}
            min={minInputDate}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </label>

        <label
          className={cn('event-form__time', 'inputfield', {
            'inputfield--error': isSubmit && !time,
          })}
        >
          <span>{time || 'Time'}</span>
          <input
            type="time"
            onChange={(e) => setTime(e.currentTarget.value)}
            value={time}
          />
        </label>
      </div>

      <div className="event-form__additional">
        <h3 className="event-form__head">Additional options</h3>
        <label className="event-form__location inputfield">
          <input
            type="text"
            placeholder="Location / Address"
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
          />
        </label>

        <Dropdown
          value={eventType}
          itemsList={eventsTypeList}
          callback={selectEvetType}
          title="Event type"
        />

        <label className="event-form__location inputfield">
          <input
            type="text"
            placeholder="Poster URL"
            value={posterURL}
            onChange={(e) => setPosterURL(e.currentTarget.value)}
          />
        </label>
      </div>

      <div className="event-form__tickets">
        <h3 className="event-form__head">Tickets</h3>

        <div className="event-form__tickets-wrapper">
          <div className="event-form__ticket ticket-form">
            {tickets.categories.map((category) => (
              <React.Fragment key={category.title}>
                <div className="ticket-form__category">{category.title}</div>
                <label className="ticket__input-data inputfield">
                  <span className="inputfield__title">Amount</span>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={category.amount}
                    onChange={(e) =>
                      handleCategoryAmountChange(category.title, e)
                    }
                  />
                </label>

                <label className="ticket__input-data inputfield">
                  <span className="inputfield__title">Price</span>
                  <input
                    type="text"
                    placeholder="Price (UAH)"
                    value={category.price}
                    onChange={(e) =>
                      handleCategoryPriceChange(category.title, e)
                    }
                  />
                </label>

                <button
                  type="button"
                  className="ticket-form__remove"
                  onClick={() => removeTicketsCategory(category.title)}
                />
              </React.Fragment>
            ))}
          </div>

          <button
            className="event-form__add-ticket-button"
            onClick={addTicketsCategory}
            type="button"
          >
            Add catogory...
          </button>
        </div>
      </div>

      <button className="event-form__add-event-button button" type="submit">
        {isEdit ? 'Accept' : 'Add event'}
      </button>
    </form>
  );
};
