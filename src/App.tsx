import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { useAppDispatch } from './store/hooks';
import { actions as eventActions } from './reducers/eventsReducer';
import { actions as ticketActions } from './reducers/ticketsReducer';
import { getEvents, getTickets } from './features/getData';
import { useEffect, useState } from 'react';
import { FormPage } from './pages/Form';
import { Loader } from './components/Loader';
import { EventPage } from './pages/EventPage';

function App() {
  const dispatch = useAppDispatch();
  const [isEventsLoaded, setEventsLoaded] = useState(false);
  const [isTicketsLoaded, setTicketsLoaded] = useState(false);

  const getEventItems = async () => {
    const eventItems = await getEvents();

    setEventsLoaded(true);
    dispatch(eventActions.load(eventItems));
  };

  const getTicketItems = async () => {
    const tickets = await getTickets();

    setTicketsLoaded(true);
    dispatch(ticketActions.load(tickets));
  };

  useEffect(() => {
    getEventItems();
    getTicketItems();
  }, []);

  return (
    <div className="page">
      <Header />

      <main className="page__main main">
        <div className="main__container">
          {isEventsLoaded && isTicketsLoaded ? (
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/addEvent" element={<FormPage />} />
              <Route path="/events/:eventId/edit" element={<FormPage />} />

              <Route path="/events/:eventId" element={<EventPage />} />
            </Routes>
          ) : (
            <Loader />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
