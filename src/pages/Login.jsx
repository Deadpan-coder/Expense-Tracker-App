import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginUser } from '../services/userService';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
      <div className="w-full max-w-sm p-8 bg-neutral-900 rounded shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full px-4 py-2 bg-black border border-orange-500 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="w-full px-4 py-2 bg-black border border-orange-500 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white/80">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-orange-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
