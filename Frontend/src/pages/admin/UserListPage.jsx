import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, config);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, config);
        setUsers(users.filter((u) => u._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Could not delete user.');
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/admin/dashboard" className="text-cyan-600 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold mb-8">User Management</h1>
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Admin</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b dark:border-slate-700">
                <td className="p-4 truncate max-w-xs">{u._id}</td>
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.isAdmin ? <span className="text-green-500 font-bold">Yes</span> : 'No'}</td>
                <td className="p-4 text-center">
                  {!u.isAdmin && (
                    <button onClick={() => deleteUserHandler(u._id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UserListPage;