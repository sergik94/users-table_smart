import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddEventForm } from './components/AddEventForm';
import { Home } from './pages/Home';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="page">
      <Header />

      <main className="page__main main">
        <div className="main__container">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/addEvent" element={<AddEventForm />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
