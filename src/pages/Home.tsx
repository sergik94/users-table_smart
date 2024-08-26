import { EventsActions } from '../components/EventsActions';
import { EventsList } from '../components/EventsList';

export const Home = () => {
  return (
    <>
      <EventsActions />

      <EventsList />
    </>
  );
};
