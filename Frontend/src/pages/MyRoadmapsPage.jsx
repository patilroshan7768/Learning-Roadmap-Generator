import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import RoadmapCard from '../components/RoadmapCard';
import { Link, useNavigate } from 'react-router-dom';

function MyRoadmapsPage() {
  const [myRoadmaps, setMyRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyRoadmaps = async () => {
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/roadmaps/myroadmaps`, config);
        setMyRoadmaps(data);
      } catch (error) { console.error('Error fetching your roadmaps:', error); } 
      finally { setLoading(false); }
    };
    fetchMyRoadmaps();
  }, [user, navigate]);

  const handleDelete = async (roadmapId) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/roadmaps/${roadmapId}`, config);
        setMyRoadmaps(myRoadmaps.filter((roadmap) => roadmap._id !== roadmapId));
      } catch (error) { console.error('Error deleting roadmap:', error); }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Created Roadmaps</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : myRoadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myRoadmaps.map(roadmap => (
            <div key={roadmap._id} className="relative group">
              <RoadmapCard roadmap={roadmap} />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={`/edit-roadmap/${roadmap._id}`} className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600">Edit</Link>
                <button onClick={() => handleDelete(roadmap._id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500">
          <p>You haven't created any roadmaps yet.</p>
          <Link to="/create-roadmap" className="mt-4 inline-block bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700">Create One Now</Link>
        </div>
      )}
    </div>
  );
}
export default MyRoadmapsPage;