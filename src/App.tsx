import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useAppDispatch } from './store/hooks';
import { actions as eventActions } from './reducers/usersReducer';
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { getUsers as getUsersFromServer } from './features/getData';
import { UsersList } from './components/UsersList';
import { User } from './types/user';

function App() {
  const dispatch = useAppDispatch();
  const [isUsersLoaded, setUsersLoaded] = useState(false);

  const getUsers = async () => {
    const users: User[] = await getUsersFromServer();

    setUsersLoaded(true);
    dispatch(eventActions.load(users));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="page">
      <Header />

      <main className="page__main main">
        <div className="main__container">
          {!isUsersLoaded ? <Loader /> : <UsersList />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
