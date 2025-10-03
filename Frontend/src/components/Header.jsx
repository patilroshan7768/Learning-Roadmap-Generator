import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

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

        {/* Desktop Menu & Controls */}
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

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-slate-800 dark:text-slate-200">☰</button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800">
          {/* === MOBILE MENU LINKS ADDED HERE === */}
          <ul className="flex flex-col items-center space-y-4 p-4 text-slate-600 dark:text-slate-300">
            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/roadmaps" onClick={() => setIsMenuOpen(false)}>Explore</NavLink></li>
            {user && (<li><NavLink to="/create-roadmap" onClick={() => setIsMenuOpen(false)}>Create Roadmap</NavLink></li>)}
            {user && !user.isAdmin && (<li><NavLink to="/my-roadmaps" onClick={() => setIsMenuOpen(false)}>My Roadmaps</NavLink></li>)}
            <hr className="w-full border-slate-200 dark:border-slate-700 my-2" />
            {user ? (
              <>
                {user.isAdmin && (<li><NavLink to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</NavLink></li>)}
                <li className="text-center"><span className="font-medium">Hello, {user.name}</span></li>
                <li><button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm w-full">Logout</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink></li>
                <li><NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="bg-cyan-600 text-white px-4 py-2 rounded-md w-full text-center block">Register</NavLink></li>
              </>
            )}
            <li className="pt-2"><button onClick={handleThemeSwitch} className="p-2 rounded-full text-2xl">{theme === 'light' ? '🌙' : '☀️'}</button></li>
          </ul>
        </div>
      )}
    </header>
  );
}
export default Header;