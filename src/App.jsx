import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Incomes from './pages/Incomes';
import AddIncome from './pages/AddIncome';
import EditIncome from './pages/EditIncome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses/add"
          element={
            <PrivateRoute>
              <AddExpense />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses/edit/:id"
          element={
            <PrivateRoute>
              <EditExpense />
            </PrivateRoute>
          }
        />
        <Route
          path="/incomes"
          element={
            <PrivateRoute>
              <Incomes />
            </PrivateRoute>
          }
        />
        <Route
          path="/incomes/add"
          element={
            <PrivateRoute>
              <AddIncome />
            </PrivateRoute>
          }
        />
        <Route
          path="/incomes/edit/:id"
          element={
            <PrivateRoute>
              <EditIncome />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
