import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { useAppDispatch } from './store/hooks';
import { actions as eventActions } from './reducers/eventsReducer';
import { actions as ticketActions } from './reducers/ticketsReducer';
import { getEvents, getTickets } from './features/getData';
import { useEffect } from 'react';
import { FormPage } from './pages/Form';

function App() {
  const dispatch = useAppDispatch();

  const getEventItems = async () => {
    const eventItems = await getEvents();

    dispatch(eventActions.load(eventItems));
  };

  const getTicketItems = async () => {
    const tickets = await getTickets();

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
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/addEvent" element={<FormPage />} />
            <Route path="/events/:eventId/edit" element={<FormPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
