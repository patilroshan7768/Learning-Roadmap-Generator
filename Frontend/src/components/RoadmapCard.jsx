import { Link } from 'react-router-dom';

function RoadmapCard({ roadmap }) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  if (!roadmap || !roadmap._id) {
    return null;
  }

  return (
    <Link to={`/roadmap/${roadmap._id}`} className="block h-full">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{roadmap.topic}</h3>
          {roadmap.difficulty && (
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColors[roadmap.difficulty]}`}>
              {roadmap.difficulty}
            </span>
          )}
        </div>
        <p className="text-cyan-700 dark:text-cyan-500 mt-2 text-sm">{roadmap.category}</p>
        <p className="text-slate-600 dark:text-slate-400 mt-4">{roadmap.description}</p>
      </div>
    </Link>
  );
}
export default RoadmapCard;