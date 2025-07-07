// src/components/IncomeCard.jsx
import { Link } from 'react-router-dom';
import incomeService from '../services/incomeService';
import expenseService from '../services/expenseService';

const fetchData = async () => {
  const incomes = await incomeService.getAllIncomes();
  const expenses = await expenseService.getAllExpenses();
  
};


function IncomeCard({ income, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-3 border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-green-600">{income.title}</h2>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
          ₹ {income.amount}
        </span>
      </div>
      <p className="text-sm text-gray-600">Category: {income.category}</p>
      <p className="text-sm text-gray-600">Date: {income.date}</p>
      <p className="text-sm text-gray-600">Description: {income.description}</p>
      <div className="mt-2 flex gap-4">
        <Link to={`/incomes/edit/${income.id}`} className="text-blue-600 hover:underline">Edit</Link>
        <button onClick={() => onDelete(income.id)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}

export default IncomeCard;
