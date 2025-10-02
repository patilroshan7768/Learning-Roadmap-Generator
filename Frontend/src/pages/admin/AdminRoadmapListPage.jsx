import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function AdminRoadmapListPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOfficialRoadmaps = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/roadmaps`, config);
        setRoadmaps(data);
      } catch (error) {
        console.error('Failed to fetch roadmaps', error);
      }
    };
    if (user && user.isAdmin) {
      fetchOfficialRoadmaps();
    }
  }, [user]);

  const deleteRoadmapHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this official roadmap?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/roadmaps/${id}`, config);
        setRoadmaps(roadmaps.filter((r) => r._id !== id));
      } catch (error) {
        console.error('Failed to delete roadmap', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/admin/dashboard" className="text-cyan-600 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold mb-8">Manage Official Roadmaps</h1>
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="p-4 text-left">Topic</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Creator</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.map((roadmap) => (
              <tr key={roadmap._id} className="border-b dark:border-slate-700">
                <td className="p-4 font-medium">{roadmap.topic}</td>
                <td className="p-4">{roadmap.category}</td>
                <td className="p-4 text-sm text-slate-500">{roadmap.user?.name || 'N/A'}</td>
                <td className="p-4 text-center space-x-2">
                  <Link to={`/edit-roadmap/${roadmap._id}`} className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Edit</Link>
                  <button onClick={() => deleteRoadmapHandler(roadmap._id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminRoadmapListPage;