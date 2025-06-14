import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const CardItem = ({ card, cards, updateCard }) => {
  const {
    id,
    name,
    bankName,
    cardNumber,
    validTill,
    isDefault,
    addToGPay,
    isLocked,
    isArchived,
    showNumber,
    cardType,
  } = card;

  const toggleField = (fieldName) => {
    updateCard(id, { [fieldName]: !card[fieldName] });
    toast.success(`${fieldName.replace(/^is/, '')} updated`);
  };

  const handleSetDefault = () => {
    if (isDefault) {
      updateCard(id, { isDefault: false });
      return;
    }

    const existing = cards.find(
      (c) => c.cardType === cardType && c.isDefault
    );
    if (existing) {
      toast.error('Only one default card allowed per type.');
      return;
    }
    updateCard(id, { isDefault: true });
  };

  const displayNumber = showNumber
    ? cardNumber
    : '**** **** **** ' + cardNumber.slice(-4);
  const cardBg = isArchived || isLocked ? 'bg-gray-300' : 'bg-[#003366]';
  const textColor = isArchived || isLocked ? 'text-gray-500' : 'text-white';

  return (
    <div className="flex gap-4 items-start w-[600px]">
      {/* LEFT SIDE: Show Button + Card */}
      <div className="flex flex-col gap-2">
        {/* Show Card Number Button */}
        <div className="flex justify-end pr-2 w-[350px]">
          <button
            className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 shadow-sm hover:bg-blue-200 transition"
            onClick={() => updateCard(id, { showNumber: !showNumber })}
          >
            {showNumber ? (
              <>
                <EyeOff size={16} />
                <span>Hide Card Number</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span>Show Card Number</span>
              </>
            )}
          </button>
        </div>

        {/* Card Box */}
        <div className={`rounded-xl p-4 shadow-md w-[350px] ${cardBg} ${textColor}`}>
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold">{name}</h4>
            <img src="/hdfc.png" alt="Bank Logo" className="w-12 h-auto" />
          </div>
          <div className="text-lg font-mono tracking-wide my-2">{displayNumber}</div>
          <div className="flex items-center gap-x-3 text-sm mb-2">
            <span>Valid Till: {validTill}</span>
            <span>CVV: •••</span>
          </div>
          <div className="flex justify-end">
            <img src="/mastercard.png" alt="Card Logo" className="w-10 h-6" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Action Buttons */}
      <div className="bg-blue-100 rounded-xl p-4 w-[200px] text-center">
        <div className="grid grid-cols-2 gap-4">
          {/* Lock Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleField('isLocked')}
              className="bg-white border p-2 rounded-full w-12 h-12 flex items-center justify-center"
              title={isLocked ? 'Unlock Card' : 'Lock Card'}
            >
              <img src="/Archive-icon-15.png" alt="Lock" className="w-5 h-5" />
            </button>
            <span className="text-[10px] mt-1 text-gray-800 font-medium">
              {isLocked ? 'Unlock' : 'Lock'}
            </span>
          </div>

          {/* Archive Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleField('isArchived')}
              className="bg-white border p-2 rounded-full w-12 h-12 flex items-center justify-center"
              title={isArchived ? 'Unarchive' : 'Archive'}
            >
              <img src="/archive.png" alt="Archive" className="w-5 h-5" />
            </button>
            <span className="text-[10px] mt-1 text-gray-800 font-medium">
              {isArchived ? 'Unarchive' : 'Archive'}
            </span>
          </div>

          {/* Set As Default Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleSetDefault}
              className={`bg-white border ${
                isDefault ? 'border-yellow-500' : 'border-gray-300'
              } p-2 rounded-full w-12 h-12 flex items-center justify-center`}
              title={isDefault ? 'Unset Default' : 'Set Default'}
            >
              <img src="/set-as-default.png" alt="Star" className="w-5 h-5" />
            </button>
            <span className="text-[10px] mt-1 text-gray-800 font-medium">
              {isDefault ? 'Unset' : 'Set Default'}
            </span>
          </div>

          {/* GPay Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => toggleField('addToGPay')}
              className={`bg-white border ${
                addToGPay ? 'border-indigo-600' : 'border-gray-300'
              } p-2 rounded-full w-12 h-12 flex items-center justify-center`}
              title={addToGPay ? 'Remove GPay' : 'Add to GPay'}
            >
              <img
                src="/google-play-or-tez.jpg"
                alt="GPay"
                className="w-5 h-5"
              />
            </button>
            <span className="text-[10px] mt-1 text-gray-800 font-medium">
              GPay
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
