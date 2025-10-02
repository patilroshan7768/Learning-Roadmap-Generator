import { useState, useEffect } from 'react';
import axios from 'axios';
import RoadmapCard from '../components/RoadmapCard';

function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/roadmaps`);
        setRoadmaps(data);
      } catch (error) { console.error('Error fetching roadmaps:', error); } 
      finally { setLoading(false); }
    };
    fetchRoadmaps();
  }, []);

  const categories = ['All', ...new Set(roadmaps.map(r => r.category))];
  const filteredRoadmaps = roadmaps
    .filter(roadmap => category === 'All' || roadmap.category === category)
    .filter(roadmap => roadmap.topic.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Explore Roadmaps</h1>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Browse our collection of official, community-vetted learning paths.</p>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input type="text" placeholder="Search..." className="w-full md:w-1/3 p-2 border rounded-md bg-white dark:bg-slate-700 dark:border-slate-600" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="w-full md:w-auto p-2 border rounded-md bg-white dark:bg-slate-700 dark:border-slate-600" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      {loading ? (
        <p className="text-center">Loading roadmaps...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoadmaps.length > 0 ? (
            filteredRoadmaps.map(roadmap => <RoadmapCard key={roadmap._id} roadmap={roadmap} />)
          ) : (
            <p className="col-span-3 text-center text-slate-500">No roadmaps found.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default RoadmapsPage;