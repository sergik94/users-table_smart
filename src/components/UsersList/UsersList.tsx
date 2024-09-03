import React, { ChangeEvent, useMemo, useState } from 'react';
import './UsersList.scss';
import { useAppSelector } from '../../store/hooks';
import { usersSelector } from '../../store/selectors';
import { User } from '../../types/user';
import { filterNumberData, filterTextData } from '../../features/filterBy';
import { useDebounce } from 'use-debounce';

type Query = Omit<User, 'id'>;

const DELAY = 500;

export const UsersList = () => {
  const users = useAppSelector(usersSelector);
  const [query, setQuery] = useState<Query>({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  const [name] = useDebounce(query.name, DELAY);
  const [username] = useDebounce(query.username, DELAY);
  const [email] = useDebounce(query.email, DELAY);
  const [phone] = useDebounce(query.phone, DELAY);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleInputUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleInputPhone = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({
      ...prev,
      phone: e.target.value,
    }));
  };

  const headList = [
    {
      title: 'name',
      value: query.name,
      cb: handleInputName,
    },
    {
      title: 'username',
      value: query.username,
      cb: handleInputUsername,
    },
    {
      title: 'email',
      value: query.email,
      cb: handleInputEmail,
    },
    {
      title: 'phone',
      value: query.phone,
      cb: handleInputPhone,
    },
  ];

  const modifiedUserList = useMemo(() => {
    if (!query.name && !query.username && !query.email && !query.phone) {
      return users;
    }

    return users.filter((user) => {
      return (
        filterTextData(user.name, name) &&
        filterTextData(user.username, username) &&
        filterTextData(user.email, email) &&
        filterNumberData(user.phone, phone)
      );
    });
  }, [users, name, username, email, phone]);

  return (
    <section className="main__users users">
      <table>
        <thead>
          <tr>
            {headList.map((h) => (
              <th key={h.title}>
                <div>{h.title}</div>
                <input
                  className="users__search"
                  type="text"
                  value={h.value}
                  onChange={h.cb}
                  placeholder={`Search by ${h.title}`}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modifiedUserList.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
