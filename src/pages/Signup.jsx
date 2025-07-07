import { useState } from 'react';
import { signup } from '../services/userService';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-black text-white">
      {/* Left Illustration Section */}
      <div className="w-1/2 bg-orange-600 p-10 flex flex-col justify-center shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">
          💰 Take Control of Your Finances
        </h1>
        <p className="text-md mb-6 text-white/90 leading-relaxed">
          Sign up now to manage your daily expenses and income with ease.
          <br />
          Track, analyze, and stay on top of your budget — all in one place.
        </p>
        <ul className="text-sm text-white/90 list-disc pl-5 mb-6 space-y-1">
          <li>✅ Simple to use</li>
          <li>✅ Add & edit expenses/incomes</li>
          <li>✅ Visual insights of your spending</li>
          <li>✅ Access from anywhere, anytime</li>
        </ul>
        <p className="text-white font-semibold">
          Let your money work <span className="underline">for you</span> — start tracking today!
        </p>
        <img
          src="./signup.jpg"
          alt="Illustration"
          className="w-full max-w-md mx-auto mt-8 rounded"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 bg-neutral-900 p-10 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-5"
        >
          <h2 className="text-2xl font-semibold text-orange-500 text-center">
            Create Account
          </h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            className="w-full px-4 py-2 bg-black border border-orange-500 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
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
            Signup
          </button>

          <p className="text-center text-sm text-white/80">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
