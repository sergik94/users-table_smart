import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EventsList } from './components/EventsList';
import { EventsActions } from './components/EventsActions';

function App() {
  return (
    <div className="page">
      <Header />

      <main className="page__main main">
        <div className="main__container">
          <EventsActions />

          <Routes>
            <Route path="/" element={<EventsList />} />

            <Route path="/:event" element={<div>Some event</div>} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
