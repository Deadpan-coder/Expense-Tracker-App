
import { useEffect, useState } from 'react';
import expenseService from '../services/expenseService';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#FF6B6B', '#FF8C42', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2'];

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchData = async () => {
    const res = await expenseService.getAllExpenses();
    setExpenses(res.data);
    setFilteredExpenses(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await expenseService.deleteExpense(id);
    fetchData();
  };

  const handleFilter = () => {
    if (!from || !to) {
      setFilteredExpenses(expenses);
      return;
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const filtered = expenses.filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate >= fromDate && expDate <= toDate;
    });

    setFilteredExpenses(filtered);
  };

  const chartData = filteredExpenses.map((exp) => ({
    name: exp.title,
    value: exp.amount,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white py-10 px-4 md:px-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Chart Section */}
        <div className="bg-neutral-900 p-6 rounded-lg shadow min-h-[450px] flex flex-col items-center  border-2 border-orange-500">
          <h2 className="text-xl font-bold mb-4">Expense Distribution</h2>
          {chartData.length > 0 ? (
            <PieChart width={350} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <p className="text-sm text-gray-400">No data to display.</p>
          )}
        </div>

        {/* List & Filter Section */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow min-h-[450px] border-2 border-orange-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Expenses</h2>
            <Link
              to="/expenses/add"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
            >
              + Add
            </Link>
          </div>

          {/* Date Filters */}
          <div className="flex gap-4 mb-4 text-sm">
            <div>
              <label className="block text-gray-300">From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="p-2 rounded bg-black text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-300">To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="p-2 rounded bg-black text-white border border-gray-600"
              />
            </div>
            <button
              onClick={handleFilter}
              className="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Filter
            </button>
          </div>

          {/* Expense Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 border-b border-gray-700">
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="border-b border-gray-700 text-white">
                    <td className="py-2">{exp.title}</td>
                    <td>₹ {exp.amount}</td>
                    <td>{exp.date}</td>
                    <td className="space-x-2">
                      <Link
                        to={`/expenses/edit/${exp.id}`}
                        className="bg-blue-600 px-3 py-1 rounded text-white text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="bg-red-600 px-3 py-1 rounded text-white text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredExpenses.length === 0 && (
              <p className="text-center text-gray-400 mt-4">No expenses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
