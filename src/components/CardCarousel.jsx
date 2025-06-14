import CardItem from './CardItem';

const CardCarousel = ({ cards, setCards }) => {
  const cardTypes = ['Credit', 'Debit'];

  const updateCard = (id, updatedFields) => {
    const updated = cards.map(card =>
      card.id === id ? { ...card, ...updatedFields } : card
    );
    setCards(updated);
  };

  return (
    <div className="space-y-10">
      {cardTypes.map(type => {
        const filtered = cards.filter(card => card.cardType === type && !card.isArchived);
        if (filtered.length === 0) return null;

        return (
          <div key={type}>
            <h3 className="text-xl font-bold text-blue-800 mb-2">{type} Cards</h3>
            <div className="flex overflow-x-auto gap-4 snap-x px-2">
              {filtered.map((card) => (
                <div key={card.id} className="snap-center flex-shrink-0 w-[620px]">
                  {/* Actual Card + Actions */}
                  <CardItem
                    card={card}
                    cards={cards}
                    updateCard={updateCard}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardCarousel;
