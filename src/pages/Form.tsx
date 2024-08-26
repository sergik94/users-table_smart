import { Link } from 'react-router-dom';
import { AddEventForm } from '../components/AddEventForm';

export const FormPage = () => {
  return (
    <section className="main__form">
      <Link to="/" className="main__home-link">
        Home
      </Link>

      <AddEventForm />
    </section>
  );
};
