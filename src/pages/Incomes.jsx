import { useEffect, useState } from 'react';
import { getAllIncomes, deleteIncome } from '../services/incomeService';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#34D399', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6'];

function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchData = async () => {
    const res = await getAllIncomes();
    setIncomes(res.data);
    setFilteredIncomes(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteIncome(id);
    fetchData();
  };

  const handleFilter = () => {
    if (!from || !to) {
      setFilteredIncomes(incomes);
      return;
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const filtered = incomes.filter((inc) => {
      const incDate = new Date(inc.date);
      return incDate >= fromDate && incDate <= toDate;
    });

    setFilteredIncomes(filtered);
  };

  const chartData = filteredIncomes.map((inc) => ({
    name: inc.title,
    value: inc.amount,
  }));

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white py-10 px-4 md:px-10">
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Chart Section */}
        <div className="bg-neutral-900 p-6 rounded-lg shadow min-h-[450px] flex flex-col items-center border-2 border-orange-500">
          <h2 className="text-xl font-bold mb-4">Income Distribution</h2>
          {chartData.length > 0 ? (
            <PieChart width={350} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                fill="#8884d8"
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
            <h2 className="text-xl font-semibold">Your Incomes</h2>
            <Link
              to="/incomes/add"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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

          {/* Income Table */}
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
                {filteredIncomes.map((inc) => (
                  <tr key={inc.id} className="border-b border-gray-700 text-white">
                    <td className="py-2">{inc.title}</td>
                    <td>₹ {inc.amount}</td>
                    <td>{inc.date}</td>
                    <td className="space-x-2">
                      <Link
                        to={`/incomes/edit/${inc.id}`}
                        className="bg-blue-600 px-3 py-1 rounded text-white text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(inc.id)}
                        className="bg-red-600 px-3 py-1 rounded text-white text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredIncomes.length === 0 && (
              <p className="text-center text-gray-400 mt-4">No incomes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Incomes;
