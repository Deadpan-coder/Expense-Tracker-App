// src/components/ExpenseCard.jsx
import { Link } from 'react-router-dom';
import incomeService from '../services/incomeService';
import expenseService from '../services/expenseService';

const fetchData = async () => {
  const incomes = await incomeService.getAllIncomes();
  const expenses = await expenseService.getAllExpenses();

};


function ExpenseCard({ expense, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-3 border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-red-600">{expense.title}</h2>
        <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
          ₹ {expense.amount}
        </span>
      </div>
      <p className="text-sm text-gray-600">Category: {expense.category}</p>
      <p className="text-sm text-gray-600">Date: {expense.date}</p>
      <p className="text-sm text-gray-600">Description: {expense.description}</p>
      <div className="mt-2 flex gap-4">
        <Link to={`/expenses/edit/${expense.id}`} className="text-blue-600 hover:underline">Edit</Link>
        <button onClick={() => onDelete(expense.id)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
