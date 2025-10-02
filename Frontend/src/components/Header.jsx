import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State to hold the current theme ('light' or 'dark')
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Effect to apply the theme class to the <html> element and save to localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Function to handle the toggle click
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const activeLinkStyle = { color: '#0891b2' };

  return (
    <header className="bg-white dark:bg-slate-800 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-cyan-600">RoadmapGen</Link>
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center space-x-6 text-slate-600 dark:text-slate-300">
            <li><NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-cyan-600">Home</NavLink></li>
            <li><NavLink to="/roadmaps" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-cyan-600">Explore</NavLink></li>
            {user && (<li><NavLink to="/create-roadmap" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-cyan-600">Create</NavLink></li>)}
            {user && !user.isAdmin && (<li><NavLink to="/my-roadmaps" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-cyan-600">My Roadmaps</NavLink></li>)}
          </ul>
          {user ? (
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
              {user.isAdmin && (<NavLink to="/admin/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-sm font-medium hover:text-cyan-600">Admin</NavLink>)}
              <span className="text-sm">Hello, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Logout</button>
            </div>
          ) : (
            <ul className="flex items-center space-x-4">
              <li><NavLink to="/login" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-cyan-600">Login</NavLink></li>
              <li><NavLink to="/register" className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">Register</NavLink></li>
            </ul>
          )}
          <button onClick={handleThemeSwitch} className="p-2 rounded-full text-xl text-slate-600 dark:text-slate-300">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-slate-800 dark:text-slate-200">☰</button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800">
          <ul className="flex flex-col items-center space-y-4 p-4 text-slate-600 dark:text-slate-300">
            {/* Mobile menu links */}
          </ul>
        </div>
      )}
    </header>
  );
}
export default Header;