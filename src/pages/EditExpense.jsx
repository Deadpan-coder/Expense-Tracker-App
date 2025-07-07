// EditExpense.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExpenseById, updateExpense } from '../services/expenseService';

function EditExpense() {
  const [form, setForm] = useState({ title: '', amount: '', category: '', description: '', date: '', type: 'expense' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getExpenseById(id);
      setForm(res.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExpense(id, form);
    navigate('/expenses');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} className="border p-2" required />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} value={form.amount} className="border p-2" required />
        <input name="category" placeholder="Category" onChange={handleChange} value={form.category} className="border p-2" required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} className="border p-2" required />
        <input name="date" type="date" onChange={handleChange} value={form.date} className="border p-2" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Update</button>
      </form>
    </div>
  );
}

export default EditExpense;
