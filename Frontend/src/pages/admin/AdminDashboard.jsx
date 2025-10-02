import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to="/admin/users" className="block p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          <h2 className="text-2xl font-bold">Manage Users</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">View and delete user accounts.</p>
        </Link>
        <Link to="/admin/roadmaps" className="block p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
          <h2 className="text-2xl font-bold">Manage Roadmaps</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">View, edit, or delete official roadmaps.</p>
        </Link>
      </div>
    </div>
  );
}
export default AdminDashboard;