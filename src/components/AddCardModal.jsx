import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  name: '',
  bankName: '',
  cardType: '',
  cardNumber: '',
  validTill: '',
  cvv: '',
  isDefault: false,
  addToGPay: false,
  isLocked: false,
  isArchived: false,
  showNumber: false
};

const AddCardModal = ({ closeModal, cards, setCards }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (form.name.length > 35) return 'Name must be under 35 characters';
    if (!form.bankName.trim()) return 'Bank Name is required';
    if (!form.cardType) return 'Card Type is required';
    if (!/^\d{16}$/.test(form.cardNumber)) return 'Card Number must be 16 digits';
    if (!form.validTill || !/^\d{2}\/\d{4}$/.test(form.validTill)) return 'Valid Till format is MM/YYYY';
    if (new Date(form.validTill.split('/')[1], form.validTill.split('/')[0]) < new Date())
      return 'Valid Till must be a future date';
    if (!form.cvv || !/^\d{3}$/.test(form.cvv)) return 'CVV must be 3 digits';

    // Only one default card per card type
    if (form.isDefault) {
      const existingDefault = cards.find(
        (card) => card.cardType === form.cardType && card.isDefault
      );
      if (existingDefault) return 'The selected card type already has a default card.';
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    const newCard = {
      ...form,
      id: Date.now(), // Unique identifier
    };

    setCards((prev) => [...prev, newCard]);
    toast.success('Card added successfully!');
    closeModal();
  };

  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl w-full max-w-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={form.bankName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <select
              name="cardType"
              value={form.cardType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Card Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (16 digits)"
              maxLength={16}
              value={form.cardNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="validTill"
              placeholder="Valid Till (MM/YYYY)"
              value={form.validTill}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              maxLength={3}
              value={form.cvv}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
              />
              <label>Set Card as Default</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="addToGPay"
                checked={form.addToGPay}
                onChange={handleChange}
              />
              <label>Add to GPay</label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Add Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCardModal;
