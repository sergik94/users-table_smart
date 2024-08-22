import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EventsList } from './components/EventsList';

function App() {
  return (
    <div className="page">
      <Header />

      <main className="page__main main">
        <div className="main__container">
          <EventsList />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
