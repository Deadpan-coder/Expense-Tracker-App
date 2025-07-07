import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { getAllIncomes } from '../services/incomeService';
import { getAllExpenses } from '../services/expenseService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const { user } = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await getAllIncomes();
        const expenseRes = await getAllExpenses();
        const incomeTotal = incomeRes.data.reduce((sum, item) => sum + item.amount, 0);
        const expenseTotal = expenseRes.data.reduce((sum, item) => sum + item.amount, 0);
        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);
  if (!user) {
    return (
      <div className="p-6 text-white text-center">
        <p className="text-gray-400">Loading user info...</p>
      </div>
    );
  }
  const cardBase = `rounded-xl shadow-lg p-6 transition transform hover:scale-105`;
  const chartData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expenses', amount: totalExpense },
    { name: 'Balance', amount: totalIncome - totalExpense }
  ];
  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user.name} 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Income Card */}
        <div className={`${cardBase} bg-gradient-to-tr from-green-500 to-emerald-600`}>
          <h2 className="text-lg font-medium">Total Income</h2>
          <p className="text-4xl font-bold mt-3">₹ {totalIncome}</p>
          <p className="text-white/70 text-sm mt-1">Up-to-date total earnings</p>
        </div>
        {/* Expense Card */}
        <div className={`${cardBase} bg-gradient-to-tr from-rose-500 to-red-600`}>
          <h2 className="text-lg font-medium">Total Expenses</h2>
          <p className="text-4xl font-bold mt-3">₹ {totalExpense}</p>
          <p className="text-white/70 text-sm mt-1">Amount you've spent</p>
        </div>
        {/* Balance Card */}
        <div className={`${cardBase} bg-gradient-to-tr from-indigo-500 to-purple-600`}>
          <h2 className="text-lg font-medium">Balance</h2>
          <p className="text-4xl font-bold mt-3">₹ {totalIncome - totalExpense}</p>
          <p className="text-white/70 text-sm mt-1">Your current financial balance</p>
        </div>
      </div>
      {/* Chart Section */}
      <div className="mt-12 bg-neutral-800 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Income vs Expense Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: '#222', color: '#fff', border: 'none' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
