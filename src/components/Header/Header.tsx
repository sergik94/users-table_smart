import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <header className="page__header header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          Events
        </Link>
      </div>
    </header>
  );
};
