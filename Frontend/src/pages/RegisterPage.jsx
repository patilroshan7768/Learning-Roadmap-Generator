import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, { name, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
      <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-slate-800 p-8 shadow-md rounded-lg">
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
        </div>
        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
        </div>
        <button type="submit" className="w-full bg-cyan-600 text-white p-3 rounded-md hover:bg-cyan-700">Register</button>
        <p className="text-center text-sm pt-2">Already have an account? <Link to="/login" className="text-cyan-600 hover:underline">Login here</Link></p>
      </form>
    </div>
  );
}
export default RegisterPage;