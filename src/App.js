import { useEffect, useState } from 'react';
import './styles.css';
import AddCardModal from './components/AddCardModal';
import CardCarousel from './components/CardCarousel';

function App() {

  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load cards from localStorage on load
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(storedCards);
  }, []);

  // Save cards to localStorage on update
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center text-2xl font-bold mb-4">
        Card Management System
      </header>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Add Card
        </button>
      </div>

      <CardCarousel cards={cards} setCards={setCards} />

      {showModal && (
        <AddCardModal
          closeModal={() => setShowModal(false)}
          cards={cards}
          setCards={setCards}
        />
      )}
    </div>
  );
}

export default App;
