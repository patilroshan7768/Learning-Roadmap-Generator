import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Comments from '../components/Comments';

function RoadmapDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      setError('');
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const roadmapRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/roadmaps/${id}`);
        setRoadmap(roadmapRes.data);
        const progressRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/progress/${roadmapRes.data._id}`, config);
        setCompletedSteps(progressRes.data.completedSteps || []);
      } catch (err) {
        setError('Failed to load roadmap details.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [id, user, navigate]);

  const handleStepToggle = async (stepId) => {
    const newCompletedSteps = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(newCompletedSteps);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/progress/${roadmap._id}`, { completedSteps: newCompletedSteps }, config);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading Roadmap...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!roadmap) return <div className="text-center py-10">Roadmap not found.</div>;
  
  const progressPercentage = (roadmap.steps?.length > 0) ? (completedSteps.length / roadmap.steps.length) * 100 : 0;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Link to="/roadmaps" className="text-cyan-600 hover:underline mb-6 inline-block">&larr; Back to Roadmaps</Link>
      <h1 className="text-4xl font-bold mb-2">{roadmap.topic}</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">{roadmap.description}</p>
      {roadmap.steps && roadmap.steps.length > 0 ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between mb-1"><span className="font-medium">Progress</span><span>{Math.round(progressPercentage)}%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <div className="space-y-4">
            {roadmap.steps.map((step, index) => (
              <div key={step._id} className="p-4 border rounded-lg bg-white dark:bg-slate-800 flex items-start gap-4">
                <input
                  type="checkbox"
                  id={`step-${step._id}`}
                  className="mt-1.5 h-5 w-5 rounded text-cyan-600 focus:ring-cyan-500"
                  checked={completedSteps.includes(step._id)}
                  onChange={() => handleStepToggle(step._id)}
                />
                <label htmlFor={`step-${step._id}`} className="flex-1">
                  <h3 className={`text-lg font-semibold ${completedSteps.includes(step._id) ? 'line-through text-slate-500' : ''}`}>{index + 1}. {step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{step.description}</p>
                  {step.resources && step.resources.length > 0 && (
                    <div className="mt-2 space-x-4">
                      {step.resources.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-600 hover:underline">🔗 {res.name}</a>
                      ))}
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-4 my-8 border-dashed border-2 rounded-lg text-center text-slate-500">
            <p>No steps have been added to this roadmap yet.</p>
        </div>
      )}
      <Comments roadmapId={roadmap._id} />
    </div>
  );
}
export default RoadmapDetailsPage;