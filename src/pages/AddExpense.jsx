import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExpense } from '../services/expenseService';

function AddExpense() {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
    type: 'expense',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense(form);
    navigate('/expenses');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center items-start pt-16">
      <div className="bg-neutral-800 border-2 border-orange-500 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Add Expense</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={form.title}
            className="bg-black text-white border border-gray-600 rounded px-4 py-2"
            required
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            onChange={handleChange}
            value={form.amount}
            className="bg-black text-white border border-gray-600 rounded px-4 py-2"
            required
          />
          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={form.category}
            className="bg-black text-white border border-gray-600 rounded px-4 py-2"
            required
          />
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
            className="bg-black text-white border border-gray-600 rounded px-4 py-2"
            required
          />
          <input
            name="date"
            type="date"
            onChange={handleChange}
            value={form.date}
            className="bg-black text-white border border-gray-600 rounded px-4 py-2"
            required
          />

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
