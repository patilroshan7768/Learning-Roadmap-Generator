import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoadmapsPage from './pages/RoadmapsPage';
import MyRoadmapsPage from './pages/MyRoadmapsPage';
import RoadmapDetailsPage from './pages/RoadmapDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateRoadmapPage from './pages/CreateRoadmapPage';
import EditRoadmapPage from './pages/EditRoadmapPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserListPage from './pages/admin/UserListPage';
import AdminRoadmapListPage from './pages/admin/AdminRoadmapListPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBg dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected User Routes */}
          <Route path="/roadmap/:id" element={<RoadmapDetailsPage />} />
          <Route path="/my-roadmaps" element={<MyRoadmapsPage />} />
          <Route path="/create-roadmap" element={<CreateRoadmapPage />} />
          <Route path="/edit-roadmap/:id" element={<EditRoadmapPage />} />
          
          {/* Protected Admin Routes */}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserListPage />} />
            <Route path="/admin/roadmaps" element={<AdminRoadmapListPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;