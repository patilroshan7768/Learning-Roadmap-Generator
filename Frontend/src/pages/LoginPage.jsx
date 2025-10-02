import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password, role });
      login(data);
      if (data.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={submitHandler} className="space-y-4 bg-white dark:bg-slate-800 p-8 shadow-md rounded-lg">
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}
        <div className="flex justify-center gap-8 mb-6">
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} className="form-radio text-cyan-600"/> User</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} className="form-radio text-red-600"/> Admin</label>
        </div>
        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
        </div>
        <button type="submit" className="w-full bg-cyan-600 text-white p-3 rounded-md hover:bg-cyan-700">Login</button>
        <p className="text-center text-sm pt-2">Don't have an account? <Link to="/register" className="text-cyan-600 hover:underline">Register here</Link></p>
      </form>
    </div>
  );
}
export default LoginPage;