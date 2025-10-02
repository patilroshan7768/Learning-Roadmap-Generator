import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RoadmapCard from '../components/RoadmapCard';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

function HomePage() {
  const [featuredRoadmaps, setFeaturedRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeaturedRoadmaps = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/roadmaps`);
        setFeaturedRoadmaps(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured roadmaps:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedRoadmaps();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div>
      <section className="text-center py-20 px-4 bg-white dark:bg-slate-800">
        <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">Your Learning Journey, Simplified.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">Discover curated roadmaps, track your progress, and build your skills with our community-driven platform.</p>
          <Link to="/roadmaps" className="mt-8 inline-block bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105">
            Explore Roadmaps
          </Link>
        </motion.div>
      </section>

      <motion.section 
        className="py-20 px-4 bg-gray-50 dark:bg-slate-900 border-y border-gray-200 dark:border-slate-700"
        initial="hidden" whileInView="visible" viewport={{ amount: 0.3 }} variants={sectionVariants}>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center">Create & Share</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-center">Build a custom learning path for any skill and contribute to the community.</p>
        <div className="text-center mt-8">
            <Link to={user ? "/create-roadmap" : "/login"} className="inline-block bg-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105">
            Start Building
            </Link>
        </div>
      </motion.section>

      <motion.section className="py-20 px-4" initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Featured Roadmaps</h2>
          {loading ? (
            <p className="text-center text-slate-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap._id} roadmap={roadmap} />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* === POWERFUL FEATURES SECTION (RESTORED) === */}
       {/* 4. Features Section */}
      <motion.section
        className="py-20 px-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Powerful Features</h2>
            <p className="text-md text-slate-600 dark:text-slate-400 mt-2">Everything you need to plan your learning journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature Card 1 */}
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Create & Customize</h3>
              {/* DESCRIPTION ADDED */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">Build your own learning paths from scratch with custom steps and resources.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
              {/* DESCRIPTION ADDED */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">Mark steps as complete and save your progress to your account.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">Community Comments</h3>
              {/* DESCRIPTION ADDED */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">Leave comments and tips on roadmap steps to share your knowledge.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
              <div className="text-5xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
              {/* DESCRIPTION ADDED */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">Manage all users and official roadmaps from a secure dashboard.</p>
            </div>

          </div>
        </div>
      </motion.section>
    </div>
  );
}
export default HomePage;