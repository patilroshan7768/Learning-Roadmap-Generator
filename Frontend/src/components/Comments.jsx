import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext.jsx';

function Comments({ roadmapId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!roadmapId) return;
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${roadmapId}`);
        setComments(data);
      } catch (error) { console.error('Error fetching comments:', error); }
    };
    fetchComments();
  }, [roadmapId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/${roadmapId}`, { text: newComment }, config);
      setComments([data, ...comments]);
      setNewComment('');
    } catch (error) { console.error('Error posting comment:', error); }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">Community Comments</h3>
      {user && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600"
            rows="3"
            placeholder="Add a comment or tip..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit" className="mt-2 bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors">
            Post Comment
          </button>
        </form>
      )}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
              <p className="font-semibold text-slate-900 dark:text-white">{comment.user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{new Date(comment.createdAt).toLocaleString()}</p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-500">No comments yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}
export default Comments;