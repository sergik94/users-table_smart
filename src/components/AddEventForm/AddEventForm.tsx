import React, { useState } from 'react';

import './AddEventForm.scss';
import { Dropdown } from '../Dropdown';
import { formatDate } from '../../features/formatDate';
import { getDateForCalendar } from '../../features/getDateForCalendar';
import { Ticket } from '../../types/ticket';

const eventsTypeList = ['concert', 'festival', 'theatre', 'other'];

export const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('Event type');
  const [posterURL, setPosterURL] = useState('');
  const [tickets, setTickets] = useState<Ticket>({
    id: 0,
    eventId: 0,
    categories: [
      {
        title: 'category 1',
        amount: 0,
        price: 0,
      },
    ],
  });

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

  const removeTicketsCategory = () => {
    setTickets((prev) => {
      return {
        ...prev,
        categories: [...prev.categories.slice(0, -1)],
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

  return (
    <form className="main__eventForm event-form">
      <h3 className="event-form__head">Main information</h3>
      <div className="event-form__main">
        <label className="event-form__title inputfield">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>

        <label className="event-form__description">
          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </label>

        <label className="event-form__date inputfield">
          <span>{formatDate(date) || 'Date'}</span>
          <input
            type="date"
            value={formatDate(date)}
            min={minInputDate}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </label>

        <label className="event-form__time inputfield">
          <span>{time || 'Time'}</span>
          <input type="time" onChange={(e) => setTime(e.currentTarget.value)} />
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

                {category.title === tickets.categories.at(-1)?.title &&
                category.title !== 'category 1' ? (
                  <button
                    className="ticket-form__remove"
                    onClick={removeTicketsCategory}
                  />
                ) : (
                  <span></span>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            className="event-form__add-ticket-button"
            onClick={addTicketsCategory}
          >
            Add catogory...
          </button>
        </div>
      </div>

      <button className="event-form__add-event-button button" type="submit">
        Add event
      </button>
    </form>
  );
};
