import { Link } from 'react-router-dom';
import { EventDetails } from '../components/EventDetails';

export const EventPage = () => {
  return (
    <section className="main__event-page">
      <Link to="/" className="main__home-link">
        Home
      </Link>

      <EventDetails />
    </section>
  );
};
