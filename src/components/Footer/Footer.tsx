import './Footer.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="page__footer footer">
      © {year} Users. All rights reserved.
    </footer>
  );
};
