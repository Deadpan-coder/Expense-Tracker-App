import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      
      <div className="text-orange-500 font-bold text-2xl tracking-wide">
        Expense Tracker
      </div>

      
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link to="/dashboard" className="hover:text-orange-400 transition duration-200">
          Dashboard
        </Link>
        <Link to="/expenses" className="hover:text-orange-400 transition duration-200">
          Expenses
        </Link>
        <Link to="/incomes" className="hover:text-orange-400 transition duration-200">
          Incomes
        </Link>

        
        {user && (
          <div className="flex items-center gap-4 ml-4">
            <span className="text-gray-300">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-md transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
